import React, { Component } from 'react';
import { Table,Pagination } from '@icedesign/base';
import Form from '../../Form'
import {isEmptyObject} from '../../../../../util'

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
      existCount:true
    };
  }
  componentDidMount(){
    this.getCards()
  }
  getCards = () => {
    const {pagination:{current,pageSize}} = this.state;
    _fetch({
      url:'/Merchant/Banksms',
      data:{
        method:'getbanksms',
        page:current,
        size:pageSize
      },
      success:(data)=>{
        console.log(data);
        const {pagination} = this.state;
        pagination.total = data.count;
        this.setState({
          dataSource:data.data,
          pagination,
          count:data.count,
          existCount:data.hasOwnProperty('count')
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
    const {pagination:{current,pageSize}} = this.state;
    _fetch({
      url:'/Merchant/Banksms',
      data:{
        method:'searchbycontent',
        // page:current,
        // size:pageSize,
        ...values
      },
      success:(data)=>{
        console.log(data);
        this.setState({
          dataSource:data.$data,
          cacheParams:{...values},
          existCount:data.hasOwnProperty('count')
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

  render() {
    const {dataSource,pagination,count,existCount } = this.state;
    return(
      <div>
        <Form onSubmit={this.handleSubmit} onReset={this.handleReset} />
        <Table dataSource={dataSource} hasBorder={false} >
          <Table.Column
            key='id'
            dataIndex='id'
            width={100}
            title={_intl.get('public.id')}
          />
          <Table.Column
            key='bank'
            dataIndex='bank'
            width={100}
            title={_intl.get('bank.bank')}
            cell={text=>text.toUpperCase()}
          />
          <Table.Column
            key='amount'
            dataIndex='amount'
            width={100}
            title={_intl.get('sms.amount')}
          />
          <Table.Column
            key='phone'
            dataIndex='phone'
            width={100}
            title={_intl.get('bank.phone')}
          />
          <Table.Column
            key='secret'
            dataIndex='secret'
            width={100}
            title={_intl.get('sms.secret')}
          />
          <Table.Column
            key='tac'
            dataIndex='tac'
            width={100}
            title={_intl.get('public.code')}
          />
          <Table.Column
            key='tobank'
            dataIndex='tobank'
            width={100}
            title={_intl.get('sms.tobank')}
          />
          <Table.Column
            key='toaccount'
            dataIndex='toaccount'
            width={100}
            title={_intl.get('sms.toaccount')}
          />
          <Table.Column
            key='toholder'
            dataIndex='toholder'
            width={100}
            title={_intl.get('sms.toholder')}
          />
          <Table.Column
            key='type'
            dataIndex='type'
            width={100}
            title={_intl.get('public.type')}
          />
          <Table.Column
            key='expire'
            dataIndex='expire'
            width={100}
            title={_intl.get('sms.expire')}
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
        </Table>
        {existCount&&<div style={{marginTop:'15px',textAlign:'right'}}>
        <span>{_intl.get('public.total')} <span style={{color:'red'}}>{count}</span>
        {_intl.get('public.paginationData')} </span>
        {count>20&&<Pagination style={{display:'inline',marginLeft:'10px'}} {...pagination} hideOnlyOnePage={true} onChange={this.handleChange}/>}
        </div>}
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
  }
};
