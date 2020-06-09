import React, { Component } from 'react';
import { Table ,Radio,Pagination,Button,moment} from '@icedesign/base';
import MonthlyForm from './component/MonthlyForm'
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import IceContainer from '@icedesign/container';
import {isEmptyObject} from '../../util'

const { Group: RadioGroup } = Radio;

 class depositmonthlylist extends Component{
  state = {
    type:'deposit',
    datetype:'monthly',
    dataSource : [],
    cacheParams:{},
    footer:()=>null,
    pagination:{
      current:1,
      pageSize:20,
      total:0
    },
    count:'',

  };
  componentDidMount(){
    this.getCards()
  }
  getCards = () => {
    const {pagination:{current,pageSize}} = this.state;
    _fetch({
      url:'/Merchant/Report',
      data:{
        method:'merchantreport',
        page:current,
        size:pageSize,
        // userid:this.props.id,
        type:this.state.type,
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
      url:'/Merchant/Recalculate',
      data:{
        method:'merchantmonthly',
        date:value
      },
      success:(data)=>{
        console.log(data)
        if(!isEmptyObject(cacheParams)){
          this.searchwithdraw(cacheParams);
        }else{
          this.getCards();
        }
      }
    })
  }
  searchwithdraw = (values)=>{
    const {pagination:{current,pageSize},type} = this.state;
    _fetch({
      url:'/Merchant/Report',
      data:{
        method:'searchmerchantreport',
        type:this.state.type,
        datetype:this.state.datetype,
        page:current,
        size:pageSize,
        ...values
      },
      success:(data)=>{
        console.log(data);
        const pagination = { ...this.state.pagination };
        pagination.total = data.count;
        const pagedata = data.data;
        const alldata = data.alldata;
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
    const {dataSource,type,pagination,footer,count} = this.state;
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
        <Table.Column
          key='wallet_deposit_all'
          dataIndex='wallet_deposit_all'
          width={100}
          title={_intl.get('bill.wallet_deposit_all')}
        />
        <Table.Column
          key='wallet_deposit_amt'
          dataIndex='wallet_deposit_amt'
          width={100}
          title={_intl.get('bill.wallet_deposit_amt')}
         />
        <Table.Column
          key='wallet_deposit_fee'
          dataIndex='wallet_deposit_fee'
          width={100}
          title={_intl.get('bill.wallet_deposit_fee')}
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
          </Table>
          <div style={{marginTop:'15px',textAlign:'right'}}>
          <span>{_intl.get('public.total')} <span style={{color:'red'}}>{count}</span>
                  {_intl.get('public.paginationData')} </span>
                  {count>20&&<Pagination style={{display:'inline',marginLeft:'10px'}} {...pagination} hideOnlyOnePage={true} onChange={this.handleChange}/>}
          </div>
        </IceContainer>
      </div>
    )
  }
}

export default depositmonthlylist
