import React, { Component } from 'react';
import { Table ,Pagination,Feedback} from '@icedesign/base';
import {isEmptyObject} from '../../../../util';
import Form from './components/Form/DailyDate';
import IceContainer from '@icedesign/container';
import './Lookrunwater.scss';
import Img from './components/Img/Img';
import Description from './components/Description';
const Toast = Feedback.toast;
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
      },
      alltotal:'',
      pagetotal:'',
      count:'',
      order:undefined
    };
  }
  componentDidMount(){
    this.getCards()
  }
  getCards = (order) => {
    const {pagination:{current,pageSize}} = this.state;
    const ascending = 2;
    const descending = 1;
    let orderby;
    if(order === 'asc'){
      orderby = ascending;
    }else if(order === 'desc'){
      orderby = descending;
    }else{
      orderby = undefined;
    }
    _fetch({
      url:'/Merchant/Agentaccount',
      data:{
        method:'getjournal',
        ledgerid:this.props.lookrunwaterdata.id,
        orderby:orderby,
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
          alltotal:data.alltotal,
          pagetotal:data.pagetotal,
          count:data.count
        })
      }
    })
  };
  handleChange = (current) =>{
    const {pagination,cacheParams,order} = this.state;
    pagination.current = current;
    this.setState({
      pagination
    },()=>{
      if(isEmptyObject(cacheParams)){
        this.getCards(order);
        return;
      }
      this.searchwithdraw(cacheParams,order)
    })
  };
  handleSubmit = (values) => {
    const {pagination} = this.state;
    pagination.current=1;
    this.setState({pagination},()=>{
      this.searchwithdraw(values)
    });
  };
  searchwithdraw = (values,order)=>{
    const {pagination:{current,pageSize}} = this.state;
    const ascending = 2;
    const descending = 1;
    let orderby;
    if(order === 'asc'){
      orderby = ascending;
    }else if(order === 'desc'){
      orderby = descending;
    }else{
      orderby = undefined;
    }
      _fetch({
        url:'/Merchant/Agentaccount',
        data:{
          method:'searchjournal',
          ledgerid:this.props.lookrunwaterdata.id,
          page:current,
          size:pageSize,
          orderby:orderby,
          start:values.start?values.start:undefined,
          stop:values.stop?values.stop:undefined,
        },
        success:(data)=>{
          console.log(data);
          const {pagination} = this.state;
          pagination.total=data.count;
          this.setState({
            dataSource:data.data,
            cacheParams:{...values},
            pagination,
            alltotal:data.alltotal,
            pagetotal:data.pagetotal,
            count:data.count
          })
        },
        error:(error)=>{
          console.log(error);
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
  // 按编号排序
  onSort (dataIndex, order)  {
    const {pagination,cacheParams} = this.state;
    this.setState({
      pagination,
      order
    },()=>{
      if(isEmptyObject(cacheParams)){
        this.getCards(order);
        return;
      }
      this.searchwithdraw(cacheParams,order)
    })
  }

  render() {
    const {dataSource,pagination,alltotal,pagetotal,count } = this.state;
    const {financelistname} = this.props;
    return(
      <div>
      <IceContainer>
        <Form onSubmit={this.handleSubmit} onReset={this.handleReset} goback={this.props.goback} financelistname={financelistname}/>

        <Table dataSource={dataSource} hasBorder={false} onSort={this.onSort.bind(this)}>
          <Table.Column
            key='id'
            dataIndex='id'
            width={100}
            title={_intl.get('public.id')}
            sortable 
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
            key='fee'
            dataIndex='fee'
            width={100}
            title={_intl.get('bank.fee_mony')}
          />
          <Table.Column
            key='balance'
            dataIndex='balance'
            width={100}
            title={_intl.get('myfinance.balance')}
          />
          <Table.Column
          key='description'
          dataIndex='description'
          width={100}
          title={_intl.get('myfinance.description')}
          cell={(text)=>{
            return(
              <div>
                <Description text={text}/>
              </div>
            )
          }}
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
            title={_intl.get('public.date')}
            width={100}
            // cell={(text)=>new Date(text*1000).toLocaleString('chinese',{hour12:false})}
          />
        </Table>
          
        <div style={{marginTop:'15px',textAlign:'right'}}>
          <div style={{color:'red',margin:'10px 0 5px 0'}}>{_intl.get('order.totalamount')}：{pagetotal}</div>
          <div style={{color:'red',wordBreak:'break-all',marginBottom:'10px'}}>{_intl.get('order.pageamount')}：{alltotal}</div>
          <div>
            <span>{_intl.get('public.total')} <span style={{color:'red'}}>{count}</span>{_intl.get('public.paginationData')} </span>
            {count>20&&<Pagination style={{display:'inline',marginLeft:'10px'}} {...pagination} hideOnlyOnePage={true} onChange={this.handleChange}/>}
          </div>
        </div>
        </IceContainer>
      </div>
    );
  }
}


