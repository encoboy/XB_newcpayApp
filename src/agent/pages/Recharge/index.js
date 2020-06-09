import React, { Component } from 'react';
import { Table ,Radio,Button,Dialog,Feedback,Pagination } from '@icedesign/base';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import IceContainer from '@icedesign/container';
import Form from './component/Form/Advanced';
import {connect} from 'react-redux';
import Img from './component/Img/Img';
import {isEmptyObject,hasAction} from '../../util';
import Detail from '../../components/DetailTable';

 class Recharge extends Component{
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
    type:null,
    detaildata:[],
    moneydata:[],
    lookrunwaterdata:[],
    financelistname:null,

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
    this.getCards();
  }
  getCards = () => {
    const {pagination:{current,pageSize}} = this.state;
    _fetch({
      url:'/Merchant/Usertopup',
      data:{
        method:'topuplist',
        size:pageSize,
        page:current
      },
      success:(data)=>{
        console.log('topuplist',data);
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

//   goback账目列表
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
  // 分页
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

  handleSubmit = (values) => {
    const {pagination} = this.state;
    pagination.current=1;
    this.setState({pagination},()=>{
      this.searchwithdraw(values)
    });
  };
  // 重置
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

  // 搜索账目名
  onSubmit = (values) => {
    const {pagination} = this.state;
    pagination.current = 1;
    this.setState({
      pagination
    },()=>{this.searchOrder(values)})
  };
  // 搜索
  searchOrder = (values) => {
    const {pagination:{current,pageSize}} = this.state;
      _fetch({
        url:'/Merchant/Usertopup',
        data:{
          method:'searchtopup',
          page:current,
          size:pageSize,
          ...values
        },
        success:(data)=>{
          console.log('searchtopup',data);
          const {pagination} = this.state;
          pagination.total=data.count;
          this.setState({
            dataSource:data.data,
            pagination,
            cacheParams:{...values},
            alltotal:data.alltotal,
            pagetotal:data.pagetotal,
            is_pagealltotal:true,
            is_getpagealltotal:false,
            count:data.count
          })
        }
      })

  };
  // 重置
  onReset = () => {
    const {pagination} = this.state;
    pagination.current = 1;
    this.setState({
      pagination
    },()=>this.getCards())
  };
  // 分页
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
      this.searchOrder(cacheParams)
    })
  };
  showDetails = (id) => {
    this.setState({
      id,
      show:true
    })
  };
  render(){
    const {btn} = this.props;
    const {dataSource,pagination,
      is_getpagealltotal,getalltotal,getpagetotal,
      alltotal,pagetotal,is_pagealltotal,count,id,show} = this.state;
    return(
      <div>
        {!show&&<div>
          <CustomBreadcrumb/>
          <IceContainer>
            <div>
            <Form onSubmit={this.onSubmit} onReset={this.onReset} getCards={this.getCards}/>
            <Table dataSource={dataSource} hasBorder={false}>
              <Table.Column
              key='id'
              dataIndex='id'
              width={100}
              title={_intl.get('Recharge.id')}
              />
              <Table.Column
                key='username'
                dataIndex='username'
                width={100}
                title={_intl.get('Recharge.username')}
                cell={(text)=>text&&text.toUpperCase()}
              />
              <Table.Column
                key='amount'
                dataIndex='amount'
                width={100}
                title={_intl.get('Recharge.amount')}
              />
              <Table.Column
              key='resit_url'
              dataIndex='resit_url'
              width={100}
              title={_intl.get('Recharge.resit')}
              cell={(text,record)=>{
                return (text&&<Img text={text}/>)
              }}
              />
              <Table.Column
              key='description'
              dataIndex='description'
              width={100}
              title={_intl.get('Recharge.description')}
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
            </div>
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
const mapStatToProp = (state) => {
  return{
    btn:state.operation.btn,
    language:state.language
  }
}

export default connect(mapStatToProp)(Recharge);
const styles = {
  tatalamount:{
    textAlign: 'right',
    paddingTop: '26px',
    color:'red',
    marginRight:'60px'
  }
};