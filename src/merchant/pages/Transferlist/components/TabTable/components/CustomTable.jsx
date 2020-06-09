import React, { Component } from 'react';
import { Table,Button,Pagination ,Feedback} from '@icedesign/base';
import Form from '../../Form'
import {isEmptyObject} from '../../../../../util'

const Toast = Feedback.toast;

export default class CustomTable extends Component {
  static displayName = 'CustomTable';

  constructor(props) {
    super(props);
    this.state = {
      dataSource:[],
      cacheParams:{},
      pagination:{
        current:1,
        pageSize:20,
        total:0
      },
      count:'',
      footer:()=>null,
      getFooter:()=>null,
    };
  }
  componentDidMount(){
    this.getCards()
  }
  getCards = () => {
    const {pagination:{current,pageSize}} = this.state;
    _fetch({
      url:'/User/Transfer',
      data:{
        method:'gettransferlist',
        page:current,
        size:pageSize
      },
      success:(data)=>{
        const {pagination} = this.state;
        pagination.total = data.count;
        this.setState({
          dataSource:data.data,
          footer:()=>null,
          pagination,
          count:data.count,
          getFooter:()=>{
            return(
              <div style={{marginBottom:'10px'}}>{_intl.get('withdraw.pagetotal')}<span style={{color:'red'}}>{data.pagetotal}</span>，{_intl.get('withdraw.total')}<span style={{color:'red'}}>{data.alltotal}</span></div>
            )
          }
        })
      }
    })
  };
  searchTransfer = (values) => {
    const {pagination} = this.state;
    _fetch({
      url:'/User/Transfer',
      data:{
        method:'searchtransfer',
        page:pagination.current,
        size:pagination.pageSize,
        ...values
      },
      success:(data)=>{
        console.log(data)
        const {pagination} = this.state;
        pagination.total=data.count
        this.setState({
          dataSource:data.data,
          cacheParams:{...values},
          count:data.count,
          pagination,
          getFooter:()=>null,
          footer:()=>{
            return(
              <div style={{marginBottom:'10px'}}>{_intl.get('withdraw.pagetotal')}<span style={{color:'red'}}>{data.pagetotal}</span>，{_intl.get('withdraw.total')}<span style={{color:'red'}}>{data.alltotal}</span></div>
            )
          }
        })
      }
    })
  };
  handleChange = (current) =>{
    const {pagination,cacheParams} = this.state;
    pagination.current = current;
    this.setState({
      pagination
    },()=>{
      if(isEmptyObject(cacheParams)){
        this.getCards()
      }else {
        this.searchTransfer(cacheParams)
      }

    })
  };
  setStatus = (transferid,method ) => {
    _fetch({
      url:'/User/Transfer',
      data:{
        method,
        transferid,
      },
      success:()=>{
        Toast.success(_intl.get('public.success'));
        this.getCards()
      }
    })
  };
  handleSubmit = (values) => {
    const {pagination} = this.state;
    pagination.current=1;
    this.setState({pagination},()=>{
    this.searchTransfer(values)
    });
  };
  handleReset = () => {
    const {pagination} = this.state;
    pagination.current=1;
    this.setState({
      pagination,
      cacheParams:{}
    },()=>{
      this.getCards()
    })
  };
  render() {
    const {dataSource,pagination,footer,getFooter,count } = this.state;
    return(
      <div>
        <Form onSubmit={this.handleSubmit} onReset={this.handleReset} />
        <Table dataSource={dataSource} hasBorder={false} >
          <Table.Column
            key='id'
            dataIndex='id'
            width={80}
            title={_intl.get('public.id')}
          />
          <Table.Column
            key='orderid'
            dataIndex='orderid'
            width={100}
            title={_intl.get('transfer.orderid')}
          />
          <Table.Column
            key='thirdpartyid'
            dataIndex='thirdpartyid'
            width={120}
            title={_intl.get('transfer.thirdpartyid')}
          />
          <Table.Column
            key='account'
            dataIndex='account'
            width={100}
            title={_intl.get('transfer.account')}
            cell={(text,index,record)=>{
              return(
                <div>
                  {record.bank.toUpperCase()} {record.account}
                </div>
              )
            }}
          />
          <Table.Column
            key='amount'
            dataIndex='amount'
            width={120}
            title={_intl.get('transfer.amount')}
          />
          <Table.Column
          key='extra'
          dataIndex='extra'
          width={100}
          title={_intl.get('transfer.extra')}
          />
          <Table.Column
            key='holder'
            dataIndex='holder'
            width={100}
            title={_intl.get('transfer.holder')}
          />
          <Table.Column
            key='status'
            dataIndex='status'
            width={100}
            title={_intl.get('usercard.status')}
            cell={(text)=><span style={styles[text]}>{_intl.get(`status.${text}`)}</span>}
          />
          <Table.Column
          key='description'
          dataIndex='description'
          width={100}
          title={_intl.get('transfer.description')}
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
            width={150}
            cell={(text,index,record)=>{
              return(
                record.status === 'pending'&&
               <div>
                 <Button onClick={()=>this.setStatus(record.id,'accept')} type="primary" size='small' style={{marginRight:'5px'}}>{_intl.get('transfer.verified')}</Button>
                 <Button onClick={()=>this.setStatus(record.id,'reject')} type="normal" shape="warning" size='small'>{_intl.get('transfer.seterror')}</Button>
               </div>
              )
            }}
          />
        </Table>
        <div style={{marginTop:'15px',textAlign:'right'}}>
          {footer()}
          {getFooter()}
          <span>{_intl.get('public.total')} <span style={{color:'red'}}>{count}</span>
          {_intl.get('public.paginationData')} </span>
          {count>20&&<Pagination style={{display:'inline',marginLeft:'10px'}} {...pagination} hideOnlyOnePage={true} onChange={this.handleChange}/>}
        </div>
      </div>
    );
  }
}

const styles = {
  verified:{
    color:'rgb(46, 204, 113)'
  },
  reject:{
    color:'rgb(255, 118, 117)'
  },
  pending:{
    color:'rgb(253, 203, 110)'
  }
};
