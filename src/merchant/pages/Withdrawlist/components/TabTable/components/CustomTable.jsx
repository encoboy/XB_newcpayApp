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
      footer:()=>null,
      getFooter:()=>null,
      pagination:{
        current:1,
        pageSize:20,
        total:0
      },
      count:''
    };
  }
  componentDidMount(){
    this.getCards()
  }
  getCards = () => {
    const {pagination:{current,pageSize}} = this.state;
    _fetch({
      url:'/User/Withdraw',
      data:{
        method:'getwithdraw',
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
      url:'/User/Withdraw',
      data:{
        method:'searchwithdraw',
        page:current,
        size:pageSize,
        ...values
      },
      success:(data)=>{
        console.log(data);
        const {pagination} = this.state;
        pagination.total=data.count
        this.setState({
          dataSource:data.data,
          cacheParams:{...values},
          count:data.count,
          Pagination,
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
    const {dataSource,pagination,footer,getFooter,count } = this.state;
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
            key='username'
            dataIndex='username'
            width={100}
            title={_intl.get('withdraw.merchantname')}
          />
          <Table.Column
            key='type'
            dataIndex='type'
            width={100}
            title={_intl.get('withdraw.type')}
            cell={text=>_intl.get(`withdraw.${text}`)}
          />
          <Table.Column
            key='status'
            dataIndex='status'
            width={100}
            title={_intl.get('withdraw.status')}
            cell={text=>_intl.get(`status.${text}`)}
          />
          <Table.Column
            key='holder'
            dataIndex='holder'
            width={100}
            title={_intl.get('withdraw.holder')}
          />
          <Table.Column
            key='bank'
            dataIndex='bank'
            width={100}
            title={_intl.get('withdraw.account')}
            cell={(text,index,record)=><span>{text.toUpperCase()} {record.account}</span>}
          />
          <Table.Column
            key='amount'
            dataIndex='amount'
            width={100}
            title={_intl.get('withdraw.amount')}
          />
          <Table.Column
            key='description'
            dataIndex='description'
            width={100}
            title={_intl.get('withdraw.comment')}
            // cell={text=>{
            //   const optionalItem =  optional.filter(function (item) {
            //     return (item[`content_cn`] === text)||(item[`content_en`] === text)
            //   })[0];
            //   return optionalItem?optionalItem[`content_${lang[language]}`]:text
            // }}
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
          {/*<Table.Column*/}
            {/*key='action'*/}
            {/*dataIndex='action'*/}
            {/*title={_intl.get('public.action')}*/}
            {/*width={100}*/}
            {/*cell={(text,index,record)=>(*/}
              {/*<div>*/}
                {/*{*/}
                  {/*hasAction(btn,'Userwithdraw_dowithdraw')&&record.status==='pending'&&record.is_transfer!==1&&*/}
                  {/*<Button type='normal' shape='text' onClick={()=>this.doWithdraw(record.id,'reject')}>{_intl.get('withdraw.reject')}</Button>*/}
                {/*}*/}
                {/*{*/}
                  {/*hasAction(btn,'Transfer_transferout')&&record.status==='pending'&&(!record.is_transfer)&&*/}
                  {/*<Link to={`/finance/transfer?bank=${record.bank}&account=${record.account}&withdrawid=${record.id}&merchantid=${record.merchantid}&amount=${record.amount}&userid=${record.userid}`} style={{padding:'0 5px'}}>{_intl.get('withdraw.transfer')}</Link>*/}
                {/*}*/}
                {/*<Button type='normal' shape='text' style={{padding:'0 5px'}} onClick={()=>this.showDetails(record.id)}>{_intl.get('public.detail')}</Button>*/}
              {/*</div>*/}
            {/*)}*/}
          {/*/>*/}
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
