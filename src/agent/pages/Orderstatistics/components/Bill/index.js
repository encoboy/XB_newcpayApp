import React, { Component } from 'react';
import { Table ,Radio,Pagination,Feedback} from '@icedesign/base';
import DalyForm from './component/DailyForm';
import MonthlyForm from './component/MonthlyForm'
import {isEmptyObject} from '../../../../util'

const { Group: RadioGroup } = Radio;
const Toast = Feedback.toast;
 class BankCard extends Component{
  state = {
    type:'daily',
    dataSource : [],
    cacheParams:{},
    footer:()=>null,
    pagination:{
      current:1,
      pageSize:20,
      total:0
    },
    config:{
      admin:{
        list:'managerreport',
        search:'searchmanagerreport'
      },
      agent:{
        list:'merchantreport',
        search:'searchmerchantreport'

      },
      merchant:{
        list:'userreport',
        search:'searchuserreport'
      }
    },
    count:'',
  };
  componentDidMount(){
    this.getCards()
  }
  getCards = () => {
    const {pagination:{current,pageSize},config,type} = this.state;
    const {platform} = this.props;
    _fetch({
      url:'/Merchant/Order',
      data:{
        method:'orderreport',
        page:current,
        size:pageSize,
        type
      },
      success:(data)=>{
        console.log('orderreport',data);
        const {pagination} = this.state;
        pagination.total = data.count;
        const pagedata = data.pagesum;
        const alldata = data.allsum;
        this.setState({
          footer:()=>null,
          pagination,
          dataSource:data.data,
          count:data.count,
          footer:()=>{
            return(
              <div style={{marginBottom:'10px'}}>
                <p>
                  <strong>{_intl.get('bill.page_total')}：</strong>
                  {_intl.get('order.order_deposit_all')}：<span style={{color:'red'}}>{pagedata.order_deposit_all}</span>，
                  {_intl.get('order.order_deposit_all_times')}：<span style={{color:'red'}}>{pagedata.order_deposit_all_times}</span>，
                  {_intl.get('order.order_transfer_all')}：<span style={{color:'red'}}>{pagedata.order_transfer_all}</span>，
                  {_intl.get('order.order_transfer_all_times')}：<span style={{color:'red'}}>{pagedata.order_transfer_all_times}</span>
                </p>
                <p>
                  <strong>{_intl.get('bill.total')}：</strong>
                  {_intl.get('order.order_deposit_all')}：<span style={{color:'red'}}>{alldata.order_deposit_all}</span>，
                  {_intl.get('order.order_deposit_all_times')}：<span style={{color:'red'}}>{alldata.order_deposit_all_times}</span>，
                  {_intl.get('order.order_transfer_all')}：<span style={{color:'red'}}>{alldata.order_transfer_all}</span>，
                  {_intl.get('order.order_transfer_all_times')}：<span style={{color:'red'}}>{alldata.order_transfer_all_times}</span>
                </p>
              </div>
            )
          }
        })
      }
    })
  };
  onChange = (type)=>{
    const {pagination} = this.state;
    pagination.current=1;
    this.setState({
      type,
      pagination,
      cacheParams:{}
    },()=>{
      this.getCards()
    });
  };
  handleChange = (current) =>{
    const {pagination,cacheParams} = this.state;
    pagination.current = current;
    this.setState({
      pagination
    },()=>{
      if(isEmptyObject(cacheParams)){
        this.getCards();
        return;
      }
      this.searchwithdraw(cacheParams)
    })
  };
  handleSubmit = (values) => {
    const {pagination} = this.state;
    pagination.current=1;
    this.setState({pagination},()=>{
      this.searchwithdraw(values)
    });
  };
  // 搜索
  searchwithdraw = (values)=>{
    const {pagination:{current,pageSize},type,config} = this.state;
    const {platform} = this.props;
      _fetch({
        url:'/Merchant/Order',
        data:{
          // method:config[platform].search,
          method:'searchorderreport',
          type,
          page:current,
          size:pageSize,
          ...values
        },
        success:(data)=>{
          console.log(data);
          const pagination = { ...this.state.pagination };
          pagination.total = data.count;
          const pagedata = data.pagesum;
          const alldata = data.allsum;
          this.setState({
            pagination,
            dataSource:data.data,
            cacheParams:{...values},
            count:data.count,
            footer:()=>{
              return(
                <div style={{marginBottom:'10px'}}>
                  <p>
                    <strong>{_intl.get('bill.page_total')}：</strong>
                    {_intl.get('order.order_deposit_all')}：<span style={{color:'red'}}>{pagedata.order_deposit_all}</span>，
                    {_intl.get('order.order_deposit_all_times')}：<span style={{color:'red'}}>{pagedata.order_deposit_all_times}</span>，
                    {_intl.get('order.order_transfer_all')}：<span style={{color:'red'}}>{pagedata.order_transfer_all}</span>，
                    {_intl.get('order.order_transfer_all_times')}：<span style={{color:'red'}}>{pagedata.order_transfer_all_times}</span>
                  </p>
                  <p>
                    <strong>{_intl.get('bill.total')}：</strong>
                    {_intl.get('order.order_deposit_all')}：<span style={{color:'red'}}>{alldata.order_deposit_all}</span>，
                    {_intl.get('order.order_deposit_all_times')}：<span style={{color:'red'}}>{alldata.order_deposit_all_times}</span>，
                    {_intl.get('order.order_transfer_all')}：<span style={{color:'red'}}>{alldata.order_transfer_all}</span>，
                    {_intl.get('order.order_transfer_all_times')}：<span style={{color:'red'}}>{alldata.order_transfer_all_times}</span>
                  </p>
                </div>
              )
            }
          })
        }
      })
  };
  handleReset = () => {
    const {pagination} = this.state;
    pagination.current=1;
    this.setState({
      cacheParams:{},
      pagination
    },()=>{
      this.getCards()
    })
  };
  render(){
    const {dataSource,type,pagination,footer,count} = this.state;
    const {platform} = this.props;
    const list = [
      {
        value: 'daily',
        label:_intl.get('sider.dailybill')
      },
      {
        value: "monthly",
        label: _intl.get('sider.monthlybill')
      }
    ];
    return(
      <div>
        <RadioGroup
          shape="button"
          dataSource={list}
          value={type}
          onChange={this.onChange}
        />
        <div style={{marginTop:'10px'}}>
          {
            type==='daily'?
              <DalyForm onSubmit={this.handleSubmit} onReset={this.handleReset}/>:
              <MonthlyForm onSubmit={this.handleSubmit} onReset={this.handleReset}/>
          }
        </div>
        <Table dataSource={dataSource} hasBorder={false} >

          <Table.Column
            key='id'
            dataIndex='id'
            width={100}
            title={_intl.get('public.id')}
          />
          <Table.Column
          key='reportdate'
          dataIndex='reportdate'
          width={100}
          title={_intl.get('order.reportdate')}
          />
          <Table.Column
            key='order_deposit_all'
            dataIndex='order_deposit_all'
            width={100}
            title={_intl.get('order.deposit_all')}
          />
          <Table.Column
            key='order_deposit_all_times'
            dataIndex='order_deposit_all_times'
            width={100}
            title={_intl.get('order.deposit_all_times')}
          />
          <Table.Column
            key='order_deposit_verified'
            dataIndex='order_deposit_verified'
            width={100}
            title={_intl.get('order.deposit_verified')}
          />
          <Table.Column
            key='order_deposit_verified_times'
            dataIndex='order_deposit_verified_times'
            width={100}
            title={_intl.get('order.deposit_verified_times')}
          />
        

          <Table.Column
          key='order_transfer_all'
          dataIndex='order_transfer_all'
          width={100}
          title={_intl.get('order.transfer_all')}
          />
          <Table.Column
          key='order_transfer_all_times'
          dataIndex='order_transfer_all_times'
          width={100}
          title={_intl.get('order.transfer_all_times')}
          />
          <Table.Column
            key='order_transfer_pendingverified'
            dataIndex='order_transfer_pendingverified'
            width={100}
            title={_intl.get('order.transfer_pendimgverified')}
          />
          <Table.Column
          key='order_transfer_pendingverified_times'
          dataIndex='order_transfer_pendingverified_times'
          width={100}
          title={_intl.get('order.transfer_pendimgverified_times')}
          />
          <Table.Column
            key='order_transfer_verified'
            dataIndex='order_transfer_verified'
            width={100}
            title={_intl.get('order.transfer_verified')}
          />
          <Table.Column
            key='order_transfer_verified_times'
            dataIndex='order_transfer_verified_times'
            width={100}
            title={_intl.get('order.transfer_verified_times')}
          />
          <Table.Column
          key='order_withdraw_all'
          dataIndex='order_withdraw_all'
          width={100}
          title={_intl.get('order.withdraw_all')}
          />
          <Table.Column
          key='order_withdraw_all_times'
          dataIndex='order_withdraw_all_times'
          width={100}
          title={_intl.get('order.withdraw_all_times')}
          />
        <Table.Column
          key='order_withdraw_pendingverified'
          dataIndex='order_withdraw_pendingverified'
          width={100}
          title={_intl.get('order.withdraw_pendimgverified')}
        />
        <Table.Column
        key='order_withdraw_pendingverified_times'
        dataIndex='order_withdraw_pendingverified_times'
        width={100}
        title={_intl.get('order.withdraw_pendimgverified_times')}
        />
        <Table.Column
          key='order_withdraw_verified'
          dataIndex='order_withdraw_verified'
          width={100}
          title={_intl.get('order.withdraw_verified')}
        />
        <Table.Column
          key='order_withdraw_verified_times'
          dataIndex='order_withdraw_verified_times'
          width={100}
          title={_intl.get('order.withdraw_verified_times')}
          />




          <Table.Column
          key='updated'
          dataIndex='updated'
          title={_intl.get('public.updated')}
          width={100}
          // cell={(text)=>new Date(text*1000).toLocaleString('chinese',{hour12:false})}
          />
          <Table.Column
            key='created'
            dataIndex='created'
            title={_intl.get('public.created')}
            width={100}
            // cell={(text)=>new Date(text*1000).toLocaleString('chinese',{hour12:false})}
          />

        </Table>
        <div style={{marginTop:'15px',textAlign:'right'}}>
         {footer()}
         <span>{_intl.get('public.total')} <span style={{color:'red'}}>{count}</span>
         {_intl.get('public.paginationData')} </span>
         {count>20&&<Pagination style={{display:'inline',marginLeft:'10px'}} {...pagination} hideOnlyOnePage={true} onChange={this.handleChange}/>}
        </div>
      </div>
    )
  }
}

export default BankCard
