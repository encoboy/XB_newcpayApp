import React, { Component } from 'react';
import { Table ,Pagination,moment} from '@icedesign/base';
import {isEmptyObject} from '../../../../../util'
import Form from '../../Form'

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
      }
    };
  }
  componentDidMount(){
    this.getCards()
  }
  getCards = () => {
    const {pagination:{current,pageSize}} = this.state;
    _fetch({
      url:'/Merchant/Userwallettrx',
      data:{
        method:'getwallettrx',
        page:current,
        size:pageSize
      },
      success:(data)=>{
        const {pagination} = this.state;
        pagination.total = data.count;
        this.setState({
          dataSource:data.data,
          pagination
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
      url:'/Merchant/Userwallettrx',
      data:{
        method:'searchwallettrx',
        page:current,
        size:pageSize,
        merchantname:values.merchantname||undefined,
        start:values.start?moment(values.start).format('YYYYMMDDHHmmss'):undefined,
        stop:values.start?moment(values.stop).format('YYYYMMDDHHmmss'):undefined,
      },
      success:(data)=>{
        const {pagination} = this.state;
        pagination.total=data.count;
        this.setState({
          dataSource:data.data,
          cacheParams:{...values},
          pagination
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
    const {dataSource,pagination } = this.state;
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
            title={_intl.get('wallet.merchantname')}
          />
          <Table.Column
            key='orderid'
            dataIndex='orderid'
            width={100}
            title={_intl.get('journal.orderid')}
          />
          <Table.Column
            key='type'
            dataIndex='type'
            width={100}
            title={_intl.get('wallet.type')}
            cell={(text)=>_intl.get(`orderTypes.${text}`)}
          />
          <Table.Column
            key='openbal'
            dataIndex='openbal'
            width={100}
            title={_intl.get('wallet.openbal')}
          />
          <Table.Column
            key='total'
            dataIndex='total'
            width={100}
            title={_intl.get('wallet.total')}
          />
          <Table.Column
            key='fee'
            dataIndex='fee'
            width={100}
            title={_intl.get('wallet.fee')}
          />
          <Table.Column
            key='amt'
            dataIndex='amt'
            width={100}
            title={_intl.get('wallet.amt')}
          />
          <Table.Column
            key='balance'
            dataIndex='balance'
            width={100}
            title={_intl.get('wallet.balance')}
          />
          <Table.Column
            key='status'
            dataIndex='status'
            width={100}
            title={_intl.get('public.status')}
            cell={text => _intl.get(`status.${text}`)}
          />
          <Table.Column
            key='created'
            dataIndex='created'
            title={_intl.get('public.created')}
            width={150}
            // cell={(text)=>new Date(text*1000).toLocaleString('chinese',{hour12:false})}
          />
          <Table.Column
            key='updated'
            dataIndex='updated'
            title={_intl.get('public.updated')}
            width={150}
            // cell={(text)=>new Date(text*1000).toLocaleString('chinese',{hour12:false})}
          />
          {/*<Table.Column*/}
          {/*key='action'*/}
          {/*title={_intl.get('public.action')}*/}
          {/*width={200}*/}
          {/*cell={(text,index,record)=>{*/}
          {/*return(*/}
          {/*<span>*/}
          {/*{*/}
          {/*record.status===1&&*/}
          {/*<Button size="small" type="primary"  style={{marginRight:'5px'}} onClick={()=>this.updateStatus(record.id,2)}>*/}
          {/*{_intl.get('public.disable')}*/}
          {/*</Button>*/}
          {/*}*/}
          {/*{*/}
          {/*record.status===2&&*/}
          {/*<Button size="small" type="primary"  style={{marginRight:'5px'}}  onClick={()=>this.updateStatus(record.id,1)}>*/}
          {/*{_intl.get('public.active')}*/}
          {/*</Button>*/}
          {/*}*/}
          {/*<DeleteBalloon*/}
          {/*handleRemove={() => this.handleRemove(record.id)}*/}
          {/*/>*/}
          {/*</span>*/}
          {/*)*/}
          {/*}}*/}
          {/*/>*/}
        </Table>
        <div style={{marginTop:'15px',textAlign:'right'}}>
          <Pagination {...pagination} hideOnlyOnePage onChange={this.handleChange}/>
        </div>
      </div>
    );
  }
}


