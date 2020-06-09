import React, { Component } from 'react';
import { Table ,Radio,Pagination,Button,moment} from '@icedesign/base';
import DalyForm from './component/DailyForm';
import MonthlyForm from './component/MonthlyForm'
import {isEmptyObject} from '../../../../util'

const { Group: RadioGroup } = Radio;

 class BankCard extends Component{
  state = {
    type:'transfer',
    datetype:'monthly',
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
      },
      count:''
    }
  };
  componentDidMount(){
    this.getCards()
  }
  getCards = () => {
    const {pagination:{current,pageSize},config,type} = this.state;
    const {platform,currencyid} = this.props;
    _fetch({
      url:'/Manager/Report',
      data:{
        method:config[platform].list,
        page:current,
        size:pageSize,
        userid:platform==='merchant'?0:undefined,
        merchantid:platform==='agent'?0:undefined,
        type:this.state.type,
        currencyid,
        datetype:this.state.datetype
      },
      success:(data)=>{
        console.log(data);
        const {pagination} = this.state;
        pagination.total = data.count;
        this.setState({
          footer:()=>null,
          pagination,
          dataSource:data.data,
          count:data.count
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
  // 重算
  againcount = (value) => {
    let values = value.slice(0,6);
    _fetch({
      url:'/Manager/Recalculate',
      data:{
        method:'walletmonthly',
        date:values
      },
      success:(data)=>{
        console.log(data)
        // this.getCards();
        let date = {
          start:parseInt(values).toString(),
          stop:parseInt(values).toString()
        }
        this.searchwithdraw(date);
      }
    })
  }
  searchwithdraw = (values)=>{
    const {pagination:{current,pageSize},type,config} = this.state;
    const {platform,currencyid} = this.props;
    _fetch({
      url:'/Manager/Report',
      data:{
        method:config[platform].search,
        type:this.state.type,
        datetype:this.state.datetype,
        page:current,
        size:pageSize,
        currencyid,
        ...values
      },
      success:(data)=>{
        const pagination = { ...this.state.pagination };
        pagination.total = data.count;
        const pagedata = data.pagetotal;
        const alldata = data.alltotal;
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
                  {_intl.get('bill.order_deposit_all')}：<span style={{color:'red'}}>{pagedata.order_deposit_all}</span>，
                  {_intl.get('bill.order_deposit_all_times')}：<span style={{color:'red'}}>{pagedata.order_deposit_all_times}</span>，
                  {_intl.get('bill.order_withdraw_all')}：<span style={{color:'red'}}>{pagedata.order_withdraw_all}</span>，
                  {_intl.get('bill.order_withdraw_all_times')}：<span style={{color:'red'}}>{pagedata.order_withdraw_all_times}</span>，
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
                  {_intl.get('bill.wallet_deposit_fee')}：<span style={{color:'red'}}>{alldata.wallet_deposit_fee}</span>
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
        {/*<RadioGroup
          shape="button"
          dataSource={list}
          value={type}
          onChange={this.onChange}
        />*/}
        <div style={{marginTop:'10px'}}>
          <MonthlyForm onSubmit={this.handleSubmit} onReset={this.handleReset}/>
        </div>
        <Table dataSource={dataSource} hasBorder={false} >


          <Table.Column
          key='reportdate'
          dataIndex='reportdate'
          width={100}
          title={_intl.get('bill.reportdate')}
          />
          {/*<Table.Column
          key='wallet_transfer_all'
          dataIndex='wallet_transfer_all'
          width={100}
          title={_intl.get('bill.wallet_transfer_all')}
          />*/}
          <Table.Column
            key='wallet_transfer_amt'
            dataIndex='wallet_transfer_amt'
            width={100}
            title={_intl.get('bill.wallet_transfer_amt')}
          />

          <Table.Column
            key='wallet_transfer_fee'
            dataIndex='wallet_transfer_fee'
            width={100}
            title={_intl.get('bill.wallet_transfer_fee')}
          />
          <Table.Column
            key='action'
            dataIndex='action'
            width={100}
            title={_intl.get('public.action')}
            cell={(text,index,record)=>{
              return(<Button type="primary" onClick={()=>{this.againcount(moment(record.reportdate).format('YYYYMM'))}}>{_intl.get('public.againcount')}</Button>)
            }}
          />
          {/*<Table.Column*/}
            {/*key='updated'*/}
            {/*dataIndex='updated'*/}
            {/*title={_intl.get('public.updated')}*/}
            {/*width={100}*/}
            {/*cell={(text)=>new Date(text*1000).toLocaleString('chinese',{hour12:false})}*/}
          {/*/>*/}
        </Table>
        <div style={{marginTop:'15px',textAlign:'right'}}>
          {/*{footer()}*/}
          <span>{_intl.get('public.total')} <span style={{color:'red'}}>{count}</span>
          {_intl.get('public.paginationData')} </span>
          {count>20&&<Pagination style={{display:'inline',marginLeft:'10px'}} {...pagination} hideOnlyOnePage={true} onChange={this.handleChange}/>}
        </div>
      </div>
    )
  }
}

export default BankCard
