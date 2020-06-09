import React, { Component } from 'react';
import { Table ,Radio,Pagination,Feedback,Button,moment} from '@icedesign/base';
import DalyForm from './component/DailyForm';
// import DalyForm from './component/DailyDate';
import MonthlyForm from './component/MonthlyForm'
import {isEmptyObject} from '../../../../util'

const { Group: RadioGroup } = Radio;
const Toast = Feedback.toast;
 class BankCard extends Component{
  state = {
    type:'inout',
    datetype:'daily',
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
      count:'',

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
        datetype:this.state.datetype,
        currencyid:currencyid
      },
      success:(data)=>{
        console.log(config[platform].list,data);
        const {pagination} = this.state;
        pagination.total = data.count;
        this.setState({
          footer:()=>null,
          pagination,
          dataSource:data.data,
          count:data.count,
         
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
    const {cacheParams} = this.state;
    _fetch({
      url:'/Manager/Recalculate',
      data:{
        method:'walletdaily',
        date:value
      },
      success:(data)=>{
        console.log(data);
        if(!isEmptyObject(cacheParams)){
          this.searchwithdraw(cacheParams);
        }else{
          this.getCards();
        }
      }
    })
}
  // 搜索
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
        currencyid:currencyid,
        ...values
      },
      success:(data)=>{
        console.log('search',data);
        const pagination = { ...this.state.pagination };
        pagination.total = data.count;
        const pagedata = data.pagetotal;
        const alldata = data.alltotal;
        this.setState({
          pagination,
          count:data.count,
          dataSource:data.data,
          cacheParams:{...values},
  
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
      pagination,
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
        <div style={{marginTop:'10px'}}>
          <DalyForm onSubmit={this.handleSubmit} onReset={this.handleReset}/>
        </div>
        <Table dataSource={dataSource} hasBorder={false} >
          <Table.Column
            key='reportdate'
            dataIndex='reportdate'
            width={100}
            title={_intl.get('bill.reportdate')}
          />
          <Table.Column
            key='wallet_total'
            dataIndex='wallet_total'
            width={100}
            title={_intl.get('bill.wallet_total')}
          />
          <Table.Column
          key='action'
          dataIndex='action'
          width={50}
          title={_intl.get('public.action')}
          cell={(text,index,record)=>{
            return(<Button type="primary" onClick={()=>{this.againcount(moment(record.reportdate).format('YYYYMMDD'))}}>{_intl.get('public.againcount')}</Button>)
          }}
          />
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
