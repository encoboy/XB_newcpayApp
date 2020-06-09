import React, { Component } from 'react';
import { Table ,Radio,Pagination} from '@icedesign/base';
import DalyForm from './component/DailyForm';
import MonthlyForm from './component/MonthlyForm'
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import IceContainer from '@icedesign/container';
import {isEmptyObject} from '../../util'

const { Group: RadioGroup } = Radio;

 class Cashlist extends Component{
  state = {
    type:'daily',
    dataSource : [],
    cacheParams:{},
    footer:()=>null,
    pagination:{
      current:1,
      pageSize:20,
      total:0
    }
  };
  componentDidMount(){
    this.getCards()
  }
  getCards = () => {
    const {pagination:{current,pageSize}} = this.state;
    _fetch({
      url:'/Manager/Report',
      data:{
        method:'merchantreport',
        page:current,
        size:pageSize,
        // userid:this.props.id,
        type:this.state.type
      },
      success:(data)=>{
        console.log(data);
        const {pagination} = this.state;
        pagination.total = data.count;
        this.setState({
          footer:()=>null,
          pagination,
          dataSource:data.data
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
  searchwithdraw = (values)=>{
    const {pagination:{current,pageSize},type} = this.state;
    _fetch({
      url:'/Merchant/Report',
      data:{
        method:'searchmerchantreport',
        type,
        page:current,
        size:pageSize,
        ...values
      },
      success:(data)=>{
        console.log(data);
        const pagination = { ...this.state.pagination };
        pagination.total = data.count;
        const pagedata = data.data;
        console.log(pagedata)
        const alldata = data.alldata;
        this.setState({
          pagination,
          dataSource:data.data,
          cacheParams:{...values},
          footer:()=>{
            return(
              <div style={{marginBottom:'10px'}}>
                <p>
                  <strong>{_intl.get('bill.page_total')}：</strong>
                  {_intl.get('bill.wallet_amt')}：<span style={{color:'red'}}>{pagedata[0].wallet_amt}</span>，
                  {_intl.get('bill.wallet_fee')}：<span style={{color:'red'}}>{pagedata[0].wallet_fee}</span>，
                  {_intl.get('bill.wallet_total')}：<span style={{color:'red'}}>{pagedata[0].wallet_total}</span>，
                  {/*{_intl.get('bill.order_withdraw_all_times')}：<span style={{color:'red'}}>{pagedata.order_withdraw_all_times}</span>，
                  {_intl.get('bill.wallet_deposit_amt')}：<span style={{color:'red'}}>{pagedata.wallet_deposit_amt}</span>，
                  {_intl.get('bill.wallet_deposit_fee')}：<span style={{color:'red'}}>{pagedata.wallet_deposit_fee}</span>
                </p>
                <p>
                  <strong>{_intl.get('bill.total')}：</strong>
                  {_intl.get('bill.order_deposit_all')}：<span style={{color:'red'}}>{alldata.order_deposit_all}</span>，
                  {_intl.get('bill.order_deposit_all_times')}：<span style={{color:'red'}}>{alldata.order_deposit_all_times}</span>，
                  {_intl.get('bill.order_withdraw_all')}：<span style={{color:'red'}}>{alldata.order_withdraw_all}</span>，
                  {_intl.get('bill.order_withdraw_all_times')}：<span style={{color:'red'}}>{alldata.order_withdraw_all_times}</span>，
                  {_intl.get('bill.wallet_deposit_amt')}：<span style={{color:'red'}}>{alldata.wallet_deposit_amt}</span>，
                  {_intl.get('bill.wallet_deposit_fee')}：<span style={{color:'red'}}>{alldata.wallet_deposit_fee}</span>*/}
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
    const {dataSource,type,pagination,footer} = this.state;
    const list = [
      {
        value: 'daily',
        label:_intl.get('sider.dailybill')
      },
      {
        value: "monthly",
        label: _intl.get('sider.monthilybill')
      }
    ];
    return(
      <div>
        <CustomBreadcrumb/>
        <IceContainer>
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
              title={_intl.get('bill.reportdate')}
            />
            <Table.Column
              key='wallet_amt'
              dataIndex='wallet_amt'
              width={100}
              title={_intl.get('bill.wallet_amt')}
            />
            <Table.Column
              key='wallet_total'
              dataIndex='wallet_total'
              width={100}
              title={_intl.get('bill.wallet_total')}
            />
            <Table.Column
              key='wallet_fee'
              dataIndex='wallet_fee'
              width={100}
              title={_intl.get('bill.wallet_fee')}
            />
            <Table.Column
              key='created'
              dataIndex='created'
              title={_intl.get('public.created')}
              width={100}
              cell={(text)=>new Date(text*1000).toLocaleString('chinese',{hour12:false})}
            />
            <Table.Column
              key='updated'
              dataIndex='updated'
              title={_intl.get('public.updated')}
              width={100}
              cell={(text)=>new Date(text*1000).toLocaleString('chinese',{hour12:false})}
            />
          </Table>
          <div style={{marginTop:'15px',textAlign:'right'}}>
            {/*{footer()}*/}
            <Pagination {...pagination} hideOnlyOnePage={true} onChange={this.handleChange}/>
          </div>
        </IceContainer>
      </div>
    )
  }
}

export default Cashlist
