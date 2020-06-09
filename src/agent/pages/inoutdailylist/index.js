import React, { Component } from 'react';
import { Table ,Radio,Pagination,Feedback,Button,moment} from '@icedesign/base';
import DalyForm from './component/DailyForm';
// import DalyForm from './component/DailyDate';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import IceContainer from '@icedesign/container';
import {isEmptyObject} from '../../util'
import { publicDecrypt } from 'crypto';

const { Group: RadioGroup } = Radio;
const Toast = Feedback.toast;
 class inoutdailylist extends Component{
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
    count:'',
    is_search:false
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
          is_search:false
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
    const {is_search,cacheParams} = this.state;
      _fetch({
        url:'/Merchant/Recalculate',
        data:{
          method:'merchantdaily',
          date:value
        },
        success:(data)=>{
          console.log(data)
          if(is_search){
            this.searchwithdraw(cacheParams);
          }else{
            this.getCards();
          }
        }
      })
  }
  // 搜索
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
          console.log(pagedata)
          const alldata = data.alldata;
          this.setState({
            pagination,
            dataSource:data.data,
            cacheParams:{...values},
            is_search:true,
            footer:()=>{
              return(
                <div style={{marginBottom:'10px'}}>
                  <p>
                    <strong>{_intl.get('bill.page_total')}：</strong>
                    {_intl.get('bill.wallet_amt')}：<span style={{color:'red'}}>{pagedata[0].wallet_amt}</span>，
                    {_intl.get('bill.wallet_fee')}：<span style={{color:'red'}}>{pagedata[0].wallet_fee}</span>，
                    {_intl.get('bill.wallet_total')}：<span style={{color:'red'}}>{pagedata[0].wallet_total}</span>
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
    const {dataSource,type,pagination,count} = this.state;
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
            key='wallet_extra'
            dataIndex='wallet_extra'
            width={100}
            title={_intl.get('bank.inout_fee_mony')}
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
          <span>{_intl.get('public.total')} <span style={{color:'red'}}>{count}</span>
          {_intl.get('public.paginationData')} </span>
          {count>20&&<Pagination style={{display:'inline',marginLeft:'10px'}} {...pagination} hideOnlyOnePage={true} onChange={this.handleChange}/>}
          </div>
        </IceContainer>
      </div>
    )
  }
}

export default inoutdailylist
