import React, { Component } from 'react';
import { Table ,Radio,Pagination,Button,moment} from '@icedesign/base';
import DalyForm from './component/DailyForm';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import IceContainer from '@icedesign/container';
import {isEmptyObject,hasAction} from '../../util';
import Info from './component/Info/Info';
import Img from './component/Img/Img';
import Details from '../../components/DetailTable';
import {connect} from 'react-redux'
const { Group: RadioGroup } = Radio;

 class Deposilist extends Component{
  state = {
    dataSource : [],
    cacheParams:{},
    footer:()=>null,
    pagination:{
      current:1,
      pageSize:20,
      total:0
    },
    show:false,
    detaildata:[],
    depositID:null,
    alltotal:"",
    pagetotal:"",
    is_pagealltotal:false,
    is_getpagealltotal:true,
    getalltotal:"",
    getpagetotal:"",
    count:'',
    id:''
  };
  componentDidMount(){
    this.getCards()
  }
  getCards = () => {
    const {pagination:{current,pageSize}} = this.state;
    _fetch({
      url:'/Merchant/Userdeposit',
      data:{
        method:'depositlist',
        page:current,
        size:pageSize
      },
      success:(data)=>{
        console.log(data);
        const {pagination} = this.state;
        pagination.total = data.count;
        this.setState({
          footer:()=>null,
          pagination,
          dataSource:data.data,
          is_pagealltotal:false,
          is_getpagealltotal:true,
          getalltotal:data.alltotal,
          getpagetotal:data.pagetotal,
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
      _fetch({
        url:'/Merchant/Recalculate',
        data:{
          method:'merchantmonthly',
          date:value
        },
        success:(data)=>{
          console.log(data)
          this.getCards();
        }
      })
    }
    // 搜索
  searchwithdraw = (values)=>{
    const {pagination:{current,pageSize},type} = this.state;
    _fetch({
      url:'/Merchant/Userdeposit',
      data:{
        method:'searchdeposit',
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
          alltotal:data.alltotal,
          pagetotal:data.pagetotal,
          is_pagealltotal:true,
          is_getpagealltotal:false,
          count:data.count,
          footer:()=>{
            return(
              <div style={{marginBottom:'10px'}}>
                <p>
                  <strong>{_intl.get('bill.page_total')}：</strong>
                  {_intl.get('bill.wallet_amt')}：<span style={{color:'red'}}>{pagedata[0].wallet_amt}</span>，
                  {_intl.get('bill.wallet_fee')}：<span style={{color:'red'}}>{pagedata[0].wallet_fee}</span>，
                  {_intl.get('bill.wallet_total')}：<span style={{color:'red'}}>{pagedata[0].wallet_total}</span>，
                </p>
              </div>
            )
          }
        })
      }
    })
  };
  //   查看存款详情
  showDetails = (id) => {
    this.setState({
      id,
      show:true
    })
  };
  goBack=()=> {
    this.setState({
      show: false
    }, () => {
      const {cacheParams} = this.state;
      if (isEmptyObject(cacheParams)) {
        this.getCards();
        return;
      }
      this.searchwithdraw(cacheParams)
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
    const {dataSource,type,
            pagination,is_getpagealltotal,
            getalltotal,getpagetotal,show,
            detaildata,depositID,alltotal,
            pagetotal,is_pagealltotal,count,id} = this.state;
    const {btn} = this.props;
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
        {!show&&<div>
        <CustomBreadcrumb/>
        <IceContainer>
          <div style={{marginTop:'10px'}}>
            <DalyForm onSubmit={this.handleSubmit} onReset={this.handleReset}/>
          </div>
          <Table dataSource={dataSource} hasBorder={false} >
          <Table.Column
          key='id'
          dataIndex='id'
          width={70}
          title={_intl.get('public.id')}
        />
        <Table.Column
        key='username'
        dataIndex='username'
        width={70}
        title={_intl.get('withdraw.merchantname')}
        />
        <Table.Column
        key='amount'
        dataIndex='amount'
        width={70}
        title={_intl.get('order.amount')}
        />
        <Table.Column
        key='orderid'
        dataIndex='orderid'
        width={80}
        title={_intl.get('order.orderid')}
        />
        <Table.Column
        key='thirdpartyid'
        dataIndex='thirdpartyid'
        width={120}
        title={_intl.get('order.thirdpartyid')}
        cell={(text)=>text&&text.toUpperCase()}
        />
        <Table.Column
        key='index'
        dataIndex='index'
        width={100}
        title={_intl.get('order.index')}
        />
        <Table.Column
        key='bank'
        dataIndex='bank'
        width={100}
        title={_intl.get('waitetransfer.account')}
        cell={(text,index,record)=>text&&text.toUpperCase()+record.account}
        />
        <Table.Column
        key='holder'
        dataIndex='holder'
        width={100}
        title={_intl.get('order.holder')}
        />

        <Table.Column
          key='status'
          dataIndex='status'
          width={70}
          title={_intl.get('order.status')}
          cell={(text)=> _intl.get(`status.${text}`)}
        />
          <Table.Column
          key='resit_url'
          dataIndex='resit_url'
          width={100}
          title={_intl.get('myfinance.logo')}
          cell={(text,record)=>{
            return (text&&<Img text={text}/>)
          }}
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
            title={_intl.get('public.action')}
            width={200}
            cell={(text,index,record)=>{
            return(
              record.orderid>0&&hasAction(btn,'Order_orderdetail')&&
              <Button  type="normal" shape="text" onClick={()=>this.showDetails(record.orderid)}>{_intl.get('wallet.order')}</Button>
            )
            }}
          />
          </Table>
          {is_pagealltotal&&<div style={styles.tatalamount}>
          <div>{_intl.get('order.pageamount')}：{pagetotal}</div>
          <div style={{marginTop:'10px'}}>{_intl.get('order.totalamount')}：{alltotal}</div>
          </div>}
          {is_getpagealltotal&&<div style={styles.tatalamount}>
          <div>{_intl.get('order.pageamount')}：{getpagetotal}</div>
          <div style={{marginTop:'10px'}}>{_intl.get('order.totalamount')}：{getalltotal}</div>
          </div>}
          <div style={{marginTop:'15px',textAlign:'right'}}>
          <span>{_intl.get('public.total')} <span style={{color:'red'}}>{count}</span>
          {_intl.get('public.paginationData')} </span>
          {count>20&&<Pagination style={{display:'inline',marginLeft:'10px'}} {...pagination} hideOnlyOnePage={true} onChange={this.handleChange}/>}
          </div>
        </IceContainer>
        </div>}
        {
          show&&
            <Details id={id} goBack={this.goBack}/>
        }
      </div>
    )
  }
}

const mapStateToProps = (state,props) => {
  return {
    btn:state.operation.btn,
    language:state.language
  }
};

export default connect(mapStateToProps)(Deposilist)
const styles = {
  tatalamount:{
    textAlign: 'right',
    paddingTop: '26px',
    color:'red',
    marginRight:'60px'
  }
};