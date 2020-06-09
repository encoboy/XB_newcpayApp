/* eslint no-underscore-dangle:0 */
import React, { Component } from 'react';
import { Table, Pagination, Tab ,Button} from '@icedesign/base';
import IceContainer from '@icedesign/container';
import SubCategoryItem from './SubCategoryItem';
import NormalForm from '../Form/Normal'
// import AdvancedForm from '../Form/Advanced'
import AdvancedForm from '../Form/DailyForm';
import {isEmptyObject} from '../../../../util'
import Deatils from '../DetailTable';
import './ComplexTabTable.scss'


export default class ComplexTabTable extends Component {
  static displayName = 'ComplexTabTable';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      activeKey:'4',
      searchType:'normal',
      id:'',
      showDeatils:false,
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
      count:'',
      footer:()=>null,
      getFooter:()=>null,
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
      url:'/User/Deposit',
      data:{
        method:'depositlist',
        page:current,
        size:pageSize,
        // type:activeKey
      },
      success:(data)=>{
        console.log(data);
        const {pagination} = this.state;
        pagination.total=data.count;
        this.setState({
          dataSource:data.data,
          bank:data.banklist,
          status:data.statuslist,
          count:data.count,
          footer:()=>null,
          pagination,
          getFooter:()=>{
            return(
              <div style={{marginBottom:'10px'}}>{_intl.get('withdraw.pagetotal')}<span style={{color:'red'}}>{data.pagetotal}</span>，{_intl.get('withdraw.total')}<span style={{color:'red'}}>{data.alltotal}</span></div>
            )
          }
        })
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
      url:'/User/Deposit',
      data:{
        method:'searchdeposit',
        page:current,
        size:pageSize,
        // ordertype:activeKey,
        // status:"pending",
        ...values
      },
      success:(data)=>{
        console.log(data);
        const {pagination} = this.state;
        pagination.total=data.count;
        this.setState({
          dataSource:data.data,
          cacheParams:{...values},
          pagination,
          totalamount:data.totalamount,
          pageamount:data.pageamount,
          getFooter:()=>null,
          count:data.count,
          footer:()=>{
            return(
              <div style={{marginBottom:'10px'}}>{_intl.get('withdraw.pagetotal')}<span style={{color:'red'}}>{data.pagetotal}</span>，{_intl.get('withdraw.total')}<span style={{color:'red'}}>{data.alltotal}</span></div>
            )
          }
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
  goBack=()=>{
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
  // 页面总金额和总金额显示
  showTotalAmount = () =>{
    this.setState({is_pagetotalAmount:true});
  }
  hideTatalAmount = () => {
    this.setState({is_pagetotalAmount:false});
  }
  render() {
    const tabs = [
      // { tab: _intl.get('order.1'), key: "1"},
      // { tab: _intl.get('order.2'), key: "2"},
      // { tab: _intl.get('order.3'), key: "3"},
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
           pageamount,footer,getFooter,count} = this.state;
    return (
      <div className="complex-tab-table">
        <IceContainer>
          {!showDetails&&
          <div>
            {/*<Tab activeKey={activeKey} onChange={this.handleTabChange}>
              {tabs.map(item => (
                <Tab.TabPane key={item.key} tab={item.tab} />
              ))}
              </Tab>
              <SubCategoryItem type={searchType} onChange={this.searchChange}/>*/}
            <div style={{marginTop:'25px'}}>
              {/*
                searchType==='normal'?
                  <NormalForm  onSubmit={this.onSubmit} onReset={this.onReset} hideTatalAmount={this.hideTatalAmount}/>:
                  <AdvancedForm bank={bank} status={status} onSubmit={this.onSubmit} onReset={this.onReset} showTotalAmount={this.showTotalAmount}/>
              */}
              <AdvancedForm bank={bank} status={status} onSubmit={this.onSubmit} onReset={this.onReset} showTotalAmount={this.showTotalAmount}/>
            </div>
            <Table dataSource={dataSource} hasBorder={false} >
              <Table.Column
                key='id'
                dataIndex='id'
                width={100}
                title={_intl.get('public.id')}
              />
              <Table.Column
              key='bank'
              dataIndex='bank'
              width={100}
              title={_intl.get('order.bank')}
              cell={(text)=>text&&text.toUpperCase()}
              />
              <Table.Column
                key='holder'
                dataIndex='holder'
                width={100}
                title={_intl.get('order.holder')}
              />
              <Table.Column
              key='thirdpartyid'
              dataIndex='thirdpartyid'
              width={100}
              title={_intl.get('order.thirdpartyid')}
              />
              <Table.Column
              key='orderid'
              dataIndex='orderid'
              width={100}
              title={_intl.get('order.orderid')}
              />
              <Table.Column
                key='status'
                dataIndex='status'
                width={100}
                title={_intl.get('order.status')}
                cell={(text)=> _intl.get(`status.${text}`)}
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
                width={100}
                title={_intl.get('order.amount')}
              />
              <Table.Column
                key='account'
                dataIndex='account'
                title={_intl.get('order.account')}
                width={100}
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
              {/*<Table.Column
              key='action'
              dataIndex='action'
              title={_intl.get('public.action')}
              width={100}
              cell={(text,index,record)=> <Button  type="normal" shape="text"  onClick={()=>this.showDetails(record.id)}>{_intl.get('public.detail')}</Button>}
              />*/}
            </Table>
            {/*is_pagetotalAmount&&<div style={styles.tatalamount}>
              <div>{_intl.get('order.pageamount')}：{pageamount}</div>
              <div style={{marginTop:'10px'}}>{_intl.get('order.totalamount')}：{totalamount}</div>
            </div>*/}
            <div style={styles.pagination}>
              {footer()}
              {getFooter()}
              <span>{_intl.get('public.total')} <span style={{color:'red'}}>{count}</span>
              {_intl.get('public.paginationData')} </span>
              {count>20&&<Pagination style={{display:'inline',marginLeft:'10px'}} {...pagination} hideOnlyOnePage={true} onChange={this.handleChange}/>}
            </div>
          </div>
          }
          {showDetails&&
          <Deatils id={id} goBack={this.goBack}/>
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
  },
  
};
