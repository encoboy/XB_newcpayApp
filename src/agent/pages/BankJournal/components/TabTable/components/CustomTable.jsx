import React, { Component } from 'react';
import { Table,Pagination } from '@icedesign/base';
import Form from '../../Form'
import {isEmptyObject} from '../../../../../util';
import EditDialog from '../../EditDialog/EditDialog'
import Description from './Description';

export default class CustomTable extends Component {
  static displayName = 'CustomTable';

  constructor(props) {
    super(props);
    this.state = {
      type:'account',
      dataSource:[],
      cacheParams:{},
      pagination:{
        current:1,
        pageSize:20,
        total:0
      },
      alltotal:"",
      pagetotal:"",
      is_pagealltotal:false,
      is_getpagealltotal:true,
      getalltotal:"",
      getpagetotal:"",
      count:''
    };
  }
  componentDidMount(){
    this.getCards()
  }
  //搜索切换
  handleTypeChange = (type) => {
    this.setState({type})
  };
  getCards = () => {
    const {pagination:{current,pageSize}} = this.state;
    _fetch({
      url:'/Merchant/Bankjournal',
      data:{
        method:'getjournal',
        page:current,
        size:pageSize
      },
      success:(data)=>{
        console.log('getjournal',data);
        const {pagination} = this.state;
        pagination.total = data.count;
        this.setState({
          dataSource:data.data,
          pagination,
          is_pagealltotal:false,
          is_getpagealltotal:true,
          getalltotal:data.alltotal,
          getpagetotal:data.pagetotal,
          count:data.count
        })
      }
    })
  };
  handleChange = (current) =>{
    const {pagination,cacheParams,type} = this.state;
    pagination.current = current;
    this.setState({
      pagination
    },()=>{
     if(isEmptyObject(cacheParams)){
       this.getCards();
       return;
     }
      if(type==='keyword'){
        this.searchwithdraw(cacheParams,'searchby')
      }else {
        this.searchwithdraw(cacheParams,'searchaccount')
      }
    })
  };
  handleSubmit = (values) => {
    const {pagination,type} = this.state;
    pagination.current=1;
    // pagination.pageSize=20;
    this.setState({pagination},()=>{
      if(type==='keyword'){
        this.searchwithdraw(values,'searchby')
      }else {
        this.searchwithdraw(values,'searchaccount')
      }
    });
  };
  searchwithdraw = (values,method)=>{
    const {pagination:{current,pageSize}} = this.state;
    _fetch({
      url:'/Merchant/Bankjournal',
      data:{
        method:method,
        page:method==='searchaccount'?current:undefined,
        size:method==='searchaccount'?pageSize:undefined,
        ...values
      },
      success:(data)=>{
        console.log(data)
        const {pagination} = this.state;
        pagination.total = data.count;
        // pagination.pageSize = data.page;
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
  handleReset = () => {
    const {pagination} = this.state;
    pagination.current=1;
    // pagination.pageSize=20;
    this.setState({
      cacheParams:{},
      type:'account',
      pagination
    },()=>{
      this.getCards()
    })
  };
  getFormValues = (values,success) => {
    _fetch({
      url:'/Merchant/Bankjournal',
      data:{
        method:'changejournal',
        ...values
      },
      success:()=>{
        success&&success();
        const {cacheParams,type} = this.state;
        if(isEmptyObject(cacheParams)){
          this.getCards();
          return;
        }
        if(type==='keyword'){
          this.searchwithdraw(cacheParams,'searchby')
        }else {
          this.searchwithdraw(cacheParams,'searchaccount')
        }
      }
    })
  };
  render() {
    const {dataSource,pagination,type,is_getpagealltotal,
      getpagetotal,pagetotal,is_pagealltotal,
      getalltotal,alltotal,count } = this.state;
    return(
      <div>
        <Form type={type} onChange={this.handleTypeChange} onSubmit={this.handleSubmit} onReset={this.handleReset} />
        <Table dataSource={dataSource} hasBorder={false} >
          <Table.Column
            key='id'
            dataIndex='id'
            width={80}
            title={_intl.get('public.id')}
          />
          <Table.Column
            key='bank'
            dataIndex='bank'
            width={80}
            title={_intl.get('journal.bank')}
            cell={text=>text.toUpperCase()}
          />
          <Table.Column
            key='account_number'
            dataIndex='account_number'
            width={120}
            title={_intl.get('journal.account')}

          />
          <Table.Column
            key='debit'
            dataIndex='debit'
            width={100}
            title={_intl.get('journal.debit')}
          />
          <Table.Column
            key='credit'
            dataIndex='credit'
            width={100}
            title={_intl.get('journal.credit')}
          />
          <Table.Column
            key='balance'
            dataIndex='balance'
            width={100}
            title={_intl.get('journal.balance')}
          />
          <Table.Column
            key='serial_number'
            dataIndex='serial_number'
            width={100}
            title={_intl.get('journal.serial_number')}
          />
          <Table.Column
            key='sender_name'
            dataIndex='sender_name'
            width={100}
            title={_intl.get('journal.sender_name')}
          />
          <Table.Column
            key='cheque_number'
            dataIndex='cheque_number'
            width={120}
            title={_intl.get('journal.cheque_number')}
          />
          <Table.Column
            key='other_payment_details'
            dataIndex='other_payment_details'
            width={100}
            title={_intl.get('journal.other_payment_details')}
          />
          <Table.Column
            key='amount'
            dataIndex='amount'
            width={100}
            title={_intl.get('journal.amount')}
          />
          <Table.Column
            key='reference'
            dataIndex='reference'
            width={100}
            title={_intl.get('journal.reference')}
          />
          <Table.Column
            key='description'
            dataIndex='description'
            width={100}
            title={_intl.get('journal.description')}
            cell={(text)=>{
              return(
                <div>
                  <Description text={text}/>
                </div>
              )
            }}
          />
          <Table.Column
            key='date'
            dataIndex='date'
            title={_intl.get('journal.date')}
            width={100}
          />
          <Table.Column
            key='created'
            dataIndex='created'
            title={_intl.get('public.created')}
            width={110}
            // cell={(text)=>new Date(text*1000).toLocaleString('chinese',{hour12:false})}
          />
          {/*<Table.Column
            key='action'
            dataIndex='action'
            title={_intl.get('public.action')}
            width={100}
            cell={(text,index,record)=>(
              <EditDialog
                record={record}
                getFormValues={this.getFormValues}
              />
            )}
            />*/}
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
      </div>
    );
  }
}

const styles = {
  approve:{
    color:'rgb(46, 204, 113)'
  },
  processing:{
    color:'rgb(84, 133, 247)'
  },
  reject:{
    color:'rgb(255, 118, 117)'
  },
  pending:{
    color:'rgb(253, 203, 110)'
  },
  tatalamount:{
    textAlign: 'right',
    paddingTop: '26px',
    color:'red',
    marginRight:'60px'
  }
};
