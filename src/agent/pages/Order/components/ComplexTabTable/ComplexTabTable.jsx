/* eslint no-underscore-dangle:0 */
import React, { Component } from 'react';
import { Table, Pagination, Tab,Button,Dialog,Feedback } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import SubCategoryItem from './SubCategoryItem';
import NormalForm from '../Form/Normal'
import AdvancedForm from '../Form/Advanced'
import {isEmptyObject} from '../../../../util'
import Details from '../DetailTable'
import './ComplexTabTable.scss'
import { compose } from 'redux';
import download from './../../../../components/Excel';

const Toast = Feedback.toast;

export default class ComplexTabTable extends Component {
  static displayName = 'ComplexTabTable';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      activeKey:'4',
      searchType:'normal',
      id:'',
      showDetails:false,
      dataSource:[],
      bank:[],
      status:[],
      cacheParams:{},
      pagination:{
        current:1,
        pageSize:20,
        total:0
      },
      is_pagetotalAmount:false,
      totalamount:"",
      pageamount:"",
      is_pagin:true,
      count:'',
      existCount:true,
      userData:[],
      exportSearchData:[]
    }
  }
  componentDidMount(){
    this.getData();
    console.log(window.localStorage)
  }
  //选项卡切换
  handleTabChange = (activeKey) => {
    this.setState({is_pagetotalAmount:false})
    const {pagination} = this.state;
    pagination.current = 1;
    this.setState({
      pagination,
      activeKey,
      searchType:'normal',
      cacheParams:{}
    },()=>{
      this.getData()
    })
  };
  //搜索切换
  searchChange = (searchType) => {
    if(searchType=='advanced'){
      _fetch({
        url:'/Merchant/User',
        data:{
          method:'getusers'
        },
        success:(data)=>{
          console.log('getusers',data);
          this.setState({userData:data.users})
        }
      })
    }
    this.setState({searchType})
  };
  //分页切换
  handleChange = (current) =>{
    const {pagination,cacheParams} = this.state;
    pagination.current = current;
    this.setState({
      pagination
    },()=>{
      if(isEmptyObject(cacheParams)){
        this.getData();
        return;
      }
      this.searchOrder(cacheParams)
    })
  };
  getData = () => {
    const {pagination:{current,pageSize},activeKey} = this.state;
    _fetch({
      url:'/Merchant/Order',
      data:{
        method:'ordersbytype',
        page:current,
        size:pageSize,
        type:activeKey
      },
      success:(data)=>{
        console.log(data);
        const {pagination} = this.state;
        pagination.total=data.count;
        this.setState({
          dataSource:data.data,
          bank:data.banklist,
          status:data.statuslist,
          pagination,
          is_pagin:true,
          count:data.count,
          existCount:data.hasOwnProperty('count')
        });
        this.hideTatalAmount();
      }
    })
  };
  onSubmit = (values) => {
    const {pagination} = this.state;
    pagination.current = 1;
    this.setState({
      pagination
    },()=>{this.searchOrder(values)})
  };
  //搜索
  searchOrder = (values,exportType ) => {
    const {pagination:{current,pageSize},activeKey} = this.state;
    _fetch({
      url:'/Merchant/Order',
      data:{
        method:'searchorders',
        page:current,
        size:pageSize,
        ordertype:activeKey,
        export:exportType?exportType:undefined,
        ...values
      },
      success:(data)=>{
        console.log(data);
        const {pagination} = this.state;
        pagination.total=data.count;
        if(this.state.searchType==='normal'){
          this.setState({is_pagin:false})
        }else{
          this.setState({is_pagin:true})
        }
        this.setState({
          dataSource:data.data,
          cacheParams:{...values},
          pagination,
          totalamount:data.totalamount,
          pageamount:data.pageamount,
          count:data.count,
          existCount:data.hasOwnProperty('count')
        })
      }
    })
  };
  // 导出excel
  downloadExl = () => {
    const { exportSearchData,activeKey } = this.state //需要导出的json数据
    let datas = _.clone(exportSearchData)//这里为了不影响项目的数据的使用 采用了lodash中的深克隆方法
    if(datas.length == 0){
      Toast.error(_intl.get('bankstatistics.nodata'));
      return
    }
    let lang = window.localStorage.getItem('agent-lang');
    let json = datas.map(item=> { //将json数据的键名更换成导出时需要的键名
      
      switch(lang){
        case 'zh-cn':
            return {
              
              "编号":item.id,
              "商家":item.username,
              "商家订单编号":item.thirdpartyid,
              "类型":_intl.get(`order.${item.type}`),
              "状态码":`${item.code}  ${item.code&&item.code.toString()==='200'?_intl.get(`order.deposit`):''} ${_intl.get(`code.${item.code}`)}` ,
              "状态":_intl.get(`status.${item.status}`),
              "标识":item.index,
              "金额":item.amount,
              "出款银行账号":`${item.from_bank.toUpperCase()} ${item.from_account}`,
              "收款银行账号":`${item.to_bank.toUpperCase()} ${item.to_account}`,
              "创建时间":item.created,
              "更新时间":item.updated
          }
        case "en-us":
            return {
              // '创建时间': this.findIdType(item.idType),//将类型代号转为汉字
              "Number":item.id,
              "Merchant":item.username,
              "Merchant Order ID":item.thirdpartyid,
              "Type":_intl.get(`order.${item.type}`),
              "Code Status":item.code,
              "Status":_intl.get(`status.${item.status}`),
              "Identification":item.index,
              "Amount":item.amount,
              "Transferor Account":item.from_account,
              "Receiver Account":item.to_account,
              "Creation Time":item.created,
              "Update Time":item.updated
          }
        case "my-vn":
            return {
              // '创建时间': this.findIdType(item.idType),//将类型代号转为汉字
              "Con số":item.id,
              "Người buôn":item.username,
              "ID đơn đặt hàng":item.thirdpartyid,
              "Loại":_intl.get(`order.${item.type}`),
              "Mã trạng thái":item.code,
              "Trạng thái":_intl.get(`status.${item.status}`),
              "Nhận dạng":item.index,
              "Số tiền":item.amount,
              "Tài khoản người chuyển":item.from_account,
              "Tài khoản người nhận":item.to_account,
              "Thời gian sáng tạo":item.created,
              "Cập nhật thời gian":item.updated
          }
        default:
      }
    })
    download(json,'订单列表.xlsx')//导出的文件名
  }
  // 导出 当前页export=2，所有export=1;
  exportData = (values ) => {
    const {pagination:{current,pageSize},activeKey} = this.state;
    _fetch({
      url:'/Merchant/Order',
      data:{
        method:'searchorders',
        page:current,
        size:pageSize,
        ordertype:activeKey,
        ...values
      },
      success:(data)=>{
        console.log(data);
        // const {pagination} = this.state;
        // pagination.total=data.count;
        // if(this.state.searchType==='normal'){
        //   this.setState({is_pagin:false})
        // }else{
        //   this.setState({is_pagin:true})
        // }
        this.setState({
          exportSearchData:data.data,
          // cacheParams:{...values},
          // pagination,
          // totalamount:data.totalamount,
          // pageamount:data.pageamount,
          // count:data.count,
          // existCount:data.hasOwnProperty('count')
        },()=>this.downloadExl())
      }
    })
  };
  onReset = () => {
    const {pagination} = this.state;
    pagination.current = 1;
    this.setState({
      searchType:'normal',
      cacheParams:{},
      pagination
    },()=>this.getData())
  };
  showDetails = (id)=>{
    this.setState({
      id,
      showDetails:true
    })
  };
  goBack = () =>{
    this.setState({
      showDetails:false
    },()=>{
      const {cacheParams} = this.state;
      if(isEmptyObject(cacheParams)){
        this.getData();
        return;
      }
      this.searchOrder(cacheParams)
    })
  };
  // 页面总金额和总金额显示与隐藏
  showTotalAmount = () =>{
    this.setState({is_pagetotalAmount:true});
  }
  hideTatalAmount = () => {
    this.setState({is_pagetotalAmount:false});
  }
  // 人工处理
  manualHanding=(orderid)=>{
    _fetch({
      url:'/Merchant/Order',
      data:{
        method:'errortomanual',
        orderid:orderid
      },
      success:(data)=>{
        console.log('errortomanual',data);
      }
    })
  };
  popupConfirm = (orderid) => {
    Dialog.confirm({
      content: _intl.get('order.manual_handing'),
      onOk:() => {
        this.manualHanding(orderid);
      }
    });
  };
  render() {
    const tabs = [
      { tab: _intl.get('order.4'), key: "4"},
      { tab: _intl.get('order.5'), key: "5"},
    ];
      const {activeKey,
             searchType,
             bank,
             status,
             dataSource,
             pagination,
             id,
             showDetails,
             is_pagetotalAmount,
             totalamount,
             pageamount,
             is_pagin,
             count,
             existCount,
             userData,
             exportSearchData} = this.state;
    return (
      <div className="complex-tab-table">
        <IceContainer>
          {!showDetails&&
          <div>
            <Tab activeKey={activeKey} onChange={this.handleTabChange}>
              {tabs.map(item => (
                <Tab.TabPane key={item.key} tab={item.tab} />
              ))}
            </Tab>
            <SubCategoryItem type={searchType} onChange={this.searchChange}/>
            <div style={{marginTop:'25px'}}>
              {
                searchType==='normal'?
                  <NormalForm  onSubmit={this.onSubmit} onReset={this.onReset} hideTatalAmount={this.hideTatalAmount}/>:
                  <AdvancedForm dataSource={dataSource} 
                                userData={userData} 
                                bank={bank} 
                                status={status} 
                                onSubmit={this.onSubmit} 
                                onReset={this.onReset} 
                                showTotalAmount={this.showTotalAmount}
                                exportData={this.exportData}
                                exportSearchData={exportSearchData}/>
              }
            </div>
            <Table dataSource={dataSource} hasBorder={false} >
              <Table.Column
                key='id'
                dataIndex='id'
                width={80}
                title={_intl.get('public.id')}
              />
              <Table.Column
              key='username'
              dataIndex='username'
              width={90}
              title={_intl.get('order.username')}
              cell={text=>text&&text.toUpperCase()}
              />
              <Table.Column
                key='thirdpartyid'
                dataIndex='thirdpartyid'
                width={110}
                title={_intl.get('order.thirdpartyid')}
              />
              <Table.Column
                key='type'
                dataIndex='type'
                width={80}
                title={_intl.get('order.type')}
                cell={(text)=>_intl.get(`order.${text}`)}
              />
              <Table.Column
                key='code'
                dataIndex='code'
                width={100}
                title={_intl.get('order.code')}
                cell={(text)=>{
                  if(activeKey==='4'){
                    return (
                      <div>
                        {text}&nbsp;&nbsp;
                        {text&&text.toString()==='200'&&<span>{_intl.get(`order.deposit`)}</span>}{_intl.get(`code.${text}`)}
  
                      </div>
                                    )
                  }else if(activeKey==='5'){
                    return (
                      <div>
                        {text}&nbsp;&nbsp;
                        {text&&text.toString()&&<span>{_intl.get(`order.transfer`)}</span>}{_intl.get(`code.${text}`)}
                      </div>
                    )
                  }
                  }}
              />
              <Table.Column
                key='status'
                dataIndex='status'
                width={80}
                title={_intl.get('order.status')}
                cell={(text)=>_intl.get(`status.${text}`)}
              />
              <Table.Column
                key='index'
                dataIndex='index'
                width={100}
                title={_intl.get('order.index')}
              />
              <Table.Column
                key='amount'
                dataIndex='amount'
                width={80}
                title={_intl.get('order.amount')}
              />
              <Table.Column
                key='from_account'
                dataIndex='from_account'
                title={_intl.get('order.from_account')}
                width={110}
                cell={(text,index,record)=>(
                  <div>{record.from_bank.toUpperCase()} {record.from_account}</div>
                )}
              />
              <Table.Column
                key='to_account'
                dataIndex='to_account'
                title={_intl.get('order.to_account')}
                width={100}
                cell={(text,index,record)=>(
                  <div>{record.to_bank.toUpperCase()} {record.to_account}</div>
                )}
              />
              <Table.Column
                key='created'
                dataIndex='created'
                title={_intl.get('public.created')}
                width={100}
                // cell={(text)=>new Date(text*1000).toLocaleString('chinese',{hour12:false})}
              />
              <Table.Column
                key='updated'
                dataIndex='updated'
                title={_intl.get('public.updated')}
                width={100}
                // cell={(text)=>new Date(text*1000).toLocaleString('chinese',{hour12:false})}
              />
              <Table.Column
              key='action'
              dataIndex='action'
              title={_intl.get('public.action')}
              width={100}
              cell={(text,index,record)=> {
          
                  return(
                    <sapn>
                    <Button  type="normal" shape="text"  onClick={()=>this.showDetails(record.id)}>{_intl.get('public.detail')}</Button>&nbsp;&nbsp;&nbsp;
                    {(record.status==='error'&&(record.type==5||record.type==2))&&
                    <Button type="normal" shape="text" onClick={()=>this.popupConfirm(record.id)}>{_intl.get('order.manual_handing')}</Button>}
                    </sapn>
                  )
                }
              }
              />
            </Table>
            {is_pagetotalAmount&&<div style={styles.tatalamount}>
              <div>{_intl.get('order.pageamount')}：{pageamount}</div>
              <div style={{marginTop:'10px'}}>{_intl.get('order.totalamount')}：{totalamount}</div>
            </div>}
            {existCount&&<div style={styles.pagination}>
            <span>{_intl.get('public.total')} <span style={{color:'red'}}>{count}</span>
            {_intl.get('public.paginationData')} </span>
            {(count>20&&is_pagin)&&<Pagination style={{display:'inline',marginLeft:'10px'}} {...pagination} hideOnlyOnePage={true} onChange={this.handleChange}/>}
            </div>}
          </div>
          }
          {showDetails&&
          <Details id={id} goBack={this.goBack} />
          }
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  complexTabTableOperation: {
    lineHeight: '28px',
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    marginLeft: '10px',
    lineHeight: '20px',
  },
  operation: {
    marginRight: '12px',
    textDecoration: 'none',
  },
  tabExtra: {
    display: 'flex',
    alignItems: 'center',
  },
  search: {
    marginLeft: 10,
  },
  tabCount: {
    marginLeft: '5px',
    color: '#3080FE',
  },
  pagination: {
    textAlign: 'right',
    paddingTop: '26px',
  },
  tatalamount:{
    textAlign: 'right',
    paddingTop: '26px',
    color:'red',
    marginRight:'60px'
  }
};
