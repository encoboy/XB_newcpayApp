/* eslint no-underscore-dangle:0 */
import React, { Component } from 'react';
import { Table, Pagination, Tab ,Button,moment} from '@icedesign/base';
import IceContainer from '@icedesign/container';
// import SubCategoryItem from './SubCategoryItem';
// import NormalForm from '../Form/Normal'
// import AdvancedForm from '../Form/Advanced'
import {isEmptyObject} from '../../../../util'
import Deatils from '../DetailTable';
import Form from '../Form/MonthlyForm';
import './ComplexTabTable.scss'


export default class ComplexTabTable extends Component {
  static displayName = 'ComplexTabTable';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      activeKey:'transfer',
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
      count:'',
      transfer:()=>null,
      withdraw:()=>null,
      deposit:()=>null,
      searchDeposit:()=>null,
      searchWithdraw:()=>null,
      searchTransfer:()=>null,
    }
  }
  componentDidMount(){
    this.getData();
  }
  //选项卡切换
  handleTabChange = (activeKey) => {
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
  // searchChange = (searchType) => {
  //   this.setState({searchType})
  // };
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
  // 得到列表数据
  getData = () => {
    const {pagination:{current,pageSize},activeKey} = this.state;
    _fetch({
      url:'/User/Userreport',
      data:{
        method:'getreport',
        page:current,
        size:pageSize,
        datetype:'monthly',
        type:activeKey
      },
      success:(data)=>{
        console.log(data)
        const {pagination} = this.state;
        // pagination.total=data.count;
        this.setState({
          dataSource:data.data,
          bank:data.banklist,
          status:data.statuslist,
          pagination,
          count:data.count,
          searchDeposit:()=>null,
          searchTransfer:()=>null,
          searchWithdraw:()=>null,
          transfer:()=>{
            return(
              <div>
              <div style={{color:'red',marginBottom:'10px'}}>{_intl.get('dailyreport.page_total')}：
                {_intl.get('dailyreport.transfer_all')}：<span style={{color:'red'}}>{data.pagedata.wallet_transfer_all}</span>，
                {_intl.get('dailyreport.transfer_amt')}：<span style={{color:'red'}}>{data.pagedata.wallet_transfer_amt}</span>，
                {_intl.get('dailyreport.transfer_fee')}：<span style={{color:'red'}}>{data.pagedata.wallet_transfer_fee}</span>
              </div>
              <div style={{color:'red'}}>{_intl.get('dailyreport.total')}：
                {_intl.get('dailyreport.transfer_all')}：<span style={{color:'red'}}>{data.alldata.wallet_transfer_all}</span>，
                {_intl.get('dailyreport.transfer_amt')}：<span style={{color:'red'}}>{data.alldata.wallet_transfer_amt}</span>，
                {_intl.get('dailyreport.transfer_fee')}：<span style={{color:'red'}}>{data.alldata.wallet_transfer_fee}</span>
              </div>
              </div>
            )
          },
          withdraw:()=>{
            return(
              <div>
              <div style={{color:'red',marginBottom:'10px'}}>{_intl.get('dailyreport.page_total')}：
              {_intl.get('dailyreport.withdraw_all')}：<span style={{color:'red'}}>{data.pagedata.wallet_withdraw_all}</span>，
              {_intl.get('dailyreport.withdraw_amt')}：<span style={{color:'red'}}>{data.pagedata.wallet_withdraw_amt}</span>，
              {_intl.get('dailyreport.withdraw_fee')}：<span style={{color:'red'}}>{data.pagedata.wallet_withdraw_fee}</span>
            </div>
            <div style={{color:'red'}}>{_intl.get('dailyreport.total')}：
              {_intl.get('dailyreport.withdraw_all')}：<span style={{color:'red'}}>{data.alldata.wallet_withdraw_all}</span>，
              {_intl.get('dailyreport.withdraw_amt')}：<span style={{color:'red'}}>{data.alldata.wallet_withdraw_amt}</span>，
              {_intl.get('dailyreport.withdraw_fee')}：<span style={{color:'red'}}>{data.alldata.wallet_withdraw_fee}</span>
            </div>
              </div>
            )
          },
          deposit:()=>{
            return(
              <div>
              <div style={{color:'red',marginBottom:'10px'}}>{_intl.get('dailyreport.page_total')}：
                {_intl.get('dailyreport.deposit_all')}：<span style={{color:'red'}}>{data.pagedata.wallet_deposit_all}</span>，
                {_intl.get('dailyreport.deposit_amt')}：<span style={{color:'red'}}>{data.pagedata.wallet_deposit_amt}</span>，
                {_intl.get('dailyreport.deposit_fee')}：<span style={{color:'red'}}>{data.pagedata.wallet_deposit_fee}</span>
              </div>
              <div style={{color:'red'}}>{_intl.get('dailyreport.total')}：
                {_intl.get('dailyreport.deposit_all')}：<span style={{color:'red'}}>{data.alldata.wallet_deposit_all}</span>，
                {_intl.get('dailyreport.deposit_amt')}：<span style={{color:'red'}}>{data.alldata.wallet_deposit_amt}</span>，
                {_intl.get('dailyreport.deposit_fee')}：<span style={{color:'red'}}>{data.alldata.wallet_deposit_fee}</span>
              </div>
              </div>
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
  searchOrder = (values) => {
    const {pagination:{current,pageSize},activeKey} = this.state;
    _fetch({
      url:'/User/Userreport',
      data:{
        method:'searchreport',
        page:current,
        size:pageSize,
        type:activeKey,
        datetype:'monthly',
        ...values
      },
      success:(data)=>{
        console.log('searchreport',data)
        const {pagination} = this.state;
        pagination.total=data.count;
        this.setState({
          dataSource:data.data,
          cacheParams:{...values},
          count:data.count,
          pagination,
          transfer:()=>null,
          withdraw:()=>null,
          deposit:()=>null,
          searchTransfer:()=>{
            return(
              <div>
              <div style={{color:'red',marginBottom:'10px'}}>{_intl.get('dailyreport.page_total')}：
              {_intl.get('dailyreport.transfer_all')}：<span style={{color:'red'}}>{data.pagedata.wallet_transfer_all}</span>，
              {_intl.get('dailyreport.transfer_amt')}：<span style={{color:'red'}}>{data.pagedata.wallet_transfer_amt}</span>，
              {_intl.get('dailyreport.transfer_fee')}：<span style={{color:'red'}}>{data.pagedata.wallet_transfer_fee}</span>
            </div>
            <div style={{color:'red'}}>{_intl.get('dailyreport.total')}：
              {_intl.get('dailyreport.transfer_all')}：<span style={{color:'red'}}>{data.alldata.wallet_transfer_all}</span>，
              {_intl.get('dailyreport.transfer_amt')}：<span style={{color:'red'}}>{data.alldata.wallet_transfer_amt}</span>，
              {_intl.get('dailyreport.transfer_fee')}：<span style={{color:'red'}}>{data.alldata.wallet_transfer_fee}</span>
            </div>
              </div>
            )
          },
          searchWithdraw:()=>{
            return(
              <div>
              <div style={{color:'red',marginBottom:'10px'}}>{_intl.get('dailyreport.page_total')}：
              {_intl.get('dailyreport.withdraw_all')}：<span style={{color:'red'}}>{data.pagedata.wallet_withdraw_all}</span>，
              {_intl.get('dailyreport.withdraw_amt')}：<span style={{color:'red'}}>{data.pagedata.wallet_withdraw_amt}</span>，
              {_intl.get('dailyreport.withdraw_fee')}：<span style={{color:'red'}}>{data.pagedata.wallet_withdraw_fee}</span>
            </div>
            <div style={{color:'red'}}>{_intl.get('dailyreport.total')}：
              {_intl.get('dailyreport.withdraw_all')}：<span style={{color:'red'}}>{data.alldata.wallet_withdraw_all}</span>，
              {_intl.get('dailyreport.withdraw_amt')}：<span style={{color:'red'}}>{data.alldata.wallet_withdraw_amt}</span>，
              {_intl.get('dailyreport.withdraw_fee')}：<span style={{color:'red'}}>{data.alldata.wallet_withdraw_fee}</span>
            </div>
              </div>
            )
          },
          searchDeposit:()=>{
            return(
              <div>
              <div style={{color:'red',marginBottom:'10px'}}>{_intl.get('dailyreport.page_total')}：
                {_intl.get('dailyreport.deposit_all')}：<span style={{color:'red'}}>{data.pagedata.wallet_deposit_all}</span>，
                {_intl.get('dailyreport.deposit_amt')}：<span style={{color:'red'}}>{data.pagedata.wallet_deposit_amt}</span>，
                {_intl.get('dailyreport.deposit_fee')}：<span style={{color:'red'}}>{data.pagedata.wallet_deposit_fee}</span>
              </div>
              <div style={{color:'red'}}>{_intl.get('dailyreport.total')}：
                {_intl.get('dailyreport.deposit_all')}：<span style={{color:'red'}}>{data.alldata.wallet_deposit_all}</span>，
                {_intl.get('dailyreport.deposit_amt')}：<span style={{color:'red'}}>{data.alldata.wallet_deposit_amt}</span>，
                {_intl.get('dailyreport.deposit_fee')}：<span style={{color:'red'}}>{data.alldata.wallet_deposit_fee}</span>
              </div>
              </div>
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


  // my code start
  // 日期搜索
  handleSubmit = (values) => {
    const {pagination} = this.state;
    pagination.current=1;
    this.setState({pagination},()=>{
      this.searchOrder(values)
    });
  };
  handleReset = () => {
    const {pagination} = this.state;
    pagination.current=1;
    this.setState({
      cacheParams:{},
      pagination
    },()=>{
      this.getData()
    })
  };
  //重算
  againcount = (value) => {
    const {cacheParams} = this.state;
    _fetch({
      url:'/User/Userreport',
      data:{
        method:'recalculate',
        kind:'monthly',
        type:'lastmonth',
        date:value
      },
      success:(data)=>{
        console.log('recalculate',data);
        if(isEmptyObject(cacheParams)){
          this.getData();
          return;
        };
        this.searchOrder(cacheParams);
      }
    })
  }
  render() {
    const tabs = [
      // { tab: _intl.get('newtodaybill.1'), key: "topup"},
      { tab: _intl.get('newtodaybill.2'), key: "transfer"},
      { tab: _intl.get('newtodaybill.3'), key: "withdraw"},
      { tab: _intl.get('newtodaybill.4'), key: "deposit"}
    ];
    const {activeKey,searchType,bank,status,dataSource,pagination,
      id,showDetails,transfer,withdraw,fee,searchTransfer,searchFee,
      searchWithdraw,deposit,searchDeposit,count} = this.state;
    return (
      <div className="complex-tab-table">
        <IceContainer>
          <Form onSubmit={this.handleSubmit} onReset={this.handleReset}/>
          {!showDetails&&
          <div>
            <Tab activeKey={activeKey} onChange={this.handleTabChange}>
              {tabs.map(item => (
                <Tab.TabPane key={item.key} tab={item.tab} />
              ))}
            </Tab>
            {activeKey==='transfer'&&<div><Table dataSource={dataSource} hasBorder={false} >
            <Table.Column
            key='reportdate'
            dataIndex='reportdate'
            width={100}
            title={_intl.get('dailyreport.reprotdate')}
            />  
            <Table.Column
              key='wallet_transfer_all'
              dataIndex='wallet_transfer_all'
              width={100}
              title={_intl.get('dailyreport.wallet_transfer_all')}
              />

              <Table.Column
                key='wallet_transfer_amt'
                dataIndex='wallet_transfer_amt'
                width={100}
                title={_intl.get('dailyreport.wallet_transfer_amt')}
              />
              <Table.Column
                key='wallet_transfer_fee'
                dataIndex='wallet_transfer_fee'
                width={100}
                title={_intl.get('dailyreport.wallet_transfer_fee')}
              />
              <Table.Column
              key='wallet_transfer_extra'
              dataIndex='wallet_transfer_extra'
              width={100}
              title={_intl.get('dailyreport.wallet_transfer_extra')}
            />
  
            </Table>
            <div style={styles.pagination}>
            {transfer()}
            {searchTransfer()}
            </div>
            </div>}
            {activeKey==='withdraw'&&<div><Table dataSource={dataSource} hasBorder={false} >
             
            <Table.Column
            key='reportdate'
            dataIndex='reportdate'
            width={100}
            title={_intl.get('dailyreport.reprotdate')}
            />
            <Table.Column
              key='wallet_withdraw_all'
              dataIndex='wallet_withdraw_all'
              width={100}
              title={_intl.get('dailyreport.wallet_withdraw_all')}
              />

              <Table.Column
                key='wallet_withdraw_amt'
                dataIndex='wallet_withdraw_amt'
                width={100}
                title={_intl.get('dailyreport.wallet_withdraw_amt')}
              />
              <Table.Column
                key='wallet_withdraw_fee'
                dataIndex='wallet_withdraw_fee'
                width={100}
                title={_intl.get('dailyreport.wallet_withdraw_fee')}
              />
              <Table.Column
                key='wallet_withdraw_extra'
                dataIndex='wallet_withdraw_extra'
                width={100}
                title={_intl.get('dailyreport.wallet_withdraw_extra')}
              />
       
            </Table>
            <div style={styles.pagination}>
            {withdraw()}
            {searchWithdraw()}
            </div>
            </div>}
            {activeKey==='deposit'&&<div><Table dataSource={dataSource} hasBorder={false} >
              
            <Table.Column
            key='reportdate'
            dataIndex='reportdate'
            width={100}
            title={_intl.get('dailyreport.reprotdate')}
            />
            <Table.Column
              key='wallet_deposit_all'
              dataIndex='wallet_deposit_all'
              width={100}
              title={_intl.get('dailyreport.wallet_deposit_all')}
              />

              <Table.Column
                key='wallet_deposit_amt'
                dataIndex='wallet_deposit_amt'
                width={100}
                title={_intl.get('dailyreport.wallet_deposit_amt')}
              />
              <Table.Column
                key='wallet_deposit_fee'
                dataIndex='wallet_deposit_fee'
                width={100}
                title={_intl.get('dailyreport.wallet_deposit_fee')}
              />
              <Table.Column
                key='wallet_deposit_extra'
                dataIndex='wallet_deposit_extra'
                width={100}
                title={_intl.get('dailyreport.wallet_deposit_extra')}
              />
     
            </Table>
            <div style={styles.pagination}>
            {deposit()}
            {searchDeposit()}
            </div>
            </div>}
            <div style={styles.pagination}>
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
};
