import React, { Component } from 'react';
import { Table ,Pagination,moment} from '@icedesign/base';
import {isEmptyObject} from '../../../../util';
import Form from './components/Form/index';
import IceContainer from '@icedesign/container';

export default class Lookrunwater extends Component {
  static displayName = 'Lookrunwater';

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
    console.log(this.props.lookrunwaterdata);
    this.getCards()
  }
  getCards = () => {
    const {pagination:{current,pageSize}} = this.state;
    _fetch({
      url:'/Merchant/Agentaccount',
      data:{
        method:'getjournal',
        ledgerid:this.props.lookrunwaterdata.id,
        page:current,
        size:pageSize
      },
      success:(data)=>{
        console.log(data);
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
      url:'/Merchant/Agentaccount',
      data:{
        method:'searchjournal',
        ledgerid:this.props.lookrunwaterdata.id,
        page:current,
        size:pageSize,
        start:values.start?moment(values.start).format('YYYYMMDDHHmmss'):undefined,
        stop:values.stop?moment(values.stop).format('YYYYMMDDHHmmss'):undefined,
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
      <IceContainer>
        <Form onSubmit={this.handleSubmit} onReset={this.handleReset} goback={this.props.goback} />
        <Table dataSource={dataSource} hasBorder={false} >
          <Table.Column
            key='id'
            dataIndex='id'
            width={100}
            title={_intl.get('public.id')}
          />
          <Table.Column
            key='type'
            dataIndex='type'
            width={100}
            title={_intl.get('myfinance.type')}
          />
          <Table.Column
            key='typeid'
            dataIndex='typeid'
            width={100}
            title={_intl.get('myfinance.typeid')}
          />
          <Table.Column
            key='openbal'
            dataIndex='openbal'
            width={100}
            title={_intl.get('myfinance.openbal')}
          />
          <Table.Column
            key='amount'
            dataIndex='amount'
            width={100}
            title={_intl.get('myfinance.amount')}
          />
          <Table.Column
            key='balance'
            dataIndex='balance'
            width={100}
            title={_intl.get('myfinance.balance')}
          />
        </Table>
        <div style={{marginTop:'15px',textAlign:'right'}}>
          <Pagination {...pagination} hideOnlyOnePage onChange={this.handleChange}/>
        </div>
        </IceContainer>
      </div>
    );
  }
}


