/* eslint no-underscore-dangle:0 */
import React, { Component } from 'react';
import { Table, Pagination, Tab,Button,Dialog,Feedback } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import AssignDialog from '../AssignDialog';
import MonopolizeDialog from '../MonopolizeDialog';
import Form from '../Form';
import {isEmptyObject} from '../../../../util'
import './ComplexTabTable.scss'
import { compose } from 'redux';
const Toast = Feedback.toast;

export default class ComplexTabTable extends Component {
  static displayName = 'ComplexTabTable';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      activeKey:'2',
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
      userData:[]
    }
  }
  componentDidMount(){
    this.getData();
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
      url:'/Merchant/Bankassign',
      data:{
        method:'bankassignlist',
        // page:current,
        // size:pageSize,
        type:activeKey
      },
      success:(data)=>{
        console.log('bankassignlist',data);
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
  searchOrder = (values ) => {
    const {pagination:{current,pageSize},activeKey} = this.state;
    _fetch({
      url:'/Merchant/Bankassign',
      data:{
        method:'searchbankassign',
        // page:current,
        // size:pageSize,
        type:activeKey,
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

  //解绑
  delBankAssign = (id) => {
    _fetch({
      url:'/Merchant/Bankassign',
      data:{
        method:'delbankassign',
        id:id
      },
      success:(data)=>{
        console.log('delbankasign',data);
        if(data.status==='ok'){
          Toast.success(_intl.get('bank.unbindSuccess'));
          this.getData();
        }
      }
    })
  }
  // 指派成功
  assignOk = () => {
    const {cacheParams} = this.state;
    if(isEmptyObject(cacheParams)){
      this.getData();
      return;
    }
    this.searchOrder(cacheParams)
  }


  // 独占成功
  monopolizeOk = () => {
    const {cacheParams} = this.state;
    if(isEmptyObject(cacheParams)){
      this.getData();
      return;
    }
    this.searchOrder(cacheParams)
  }

  render() {
    const tabs = [
      { tab: _intl.get('myfinance.transfer'), key: "2"},
      { tab: _intl.get('myfinance.deposit'), key: "4"},
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
             userData} = this.state;
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
            <div style={{marginTop:'25px'}}>
              <Form onSubmit={this.searchOrder} onReset={this.onReset} activeKey={activeKey}/>
            </div>
            <Table dataSource={dataSource} hasBorder={false} >
              <Table.Column
                key='id'
                dataIndex='id'
                width={100}
                title={_intl.get('public.id')}
              />
              <Table.Column
                key='username'
                dataIndex='username'
                width={100}
                title={_intl.get('order.username')}
                cell={text=>text&&text.toUpperCase()}
              />
  
              <Table.Column
                key='bank'
                dataIndex='bank'
                width={100}
                title={_intl.get('bank.bank')}
                cell={text=>text&&text.toUpperCase()}
              />
              <Table.Column
                key='number'
                dataIndex='number'
                title={_intl.get('bank.account')}
                width={100}
              />
                <Table.Column
                  key='name'
                  dataIndex='name'
                  width={100}
                  title={_intl.get('bankcard.holder')}
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
                  let userid = parseInt(record.userid);
                  return(
                    <sapn>
                      {userid!==0
                        ?<Button  type="normal" shape="text"  onClick={()=>this.delBankAssign(record.id)}>{_intl.get('bank.unbind')}</Button>
                        :<span>
                        <AssignDialog id = {record.id} assignOk={this.assignOk}/>&nbsp;&nbsp;
                        <MonopolizeDialog id = {record.id} monopolizeOk = {this.monopolizeOk}/>
                        </span>}
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
