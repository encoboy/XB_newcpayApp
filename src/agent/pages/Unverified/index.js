import React, { Component } from 'react';
import { Table ,Radio,Button,Dialog,Feedback,Pagination } from '@icedesign/base';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import IceContainer from '@icedesign/container';
import Form from './component/Form/Advanced';
import {connect} from 'react-redux';
import Img from './component/Img/Img';
import {isEmptyObject,hasAction} from '../../util';
import Details from '../../components/DetailTable';

 class Unverified extends Component{
  state = {
    dataSource : [],
    cacheParams:{},
    footer:()=>null,
    show:false,
    total:"",
    count:'',
    id:'',
    time:''
  };
  componentDidMount(){
    console.log(localStorage)
  }
  componentWillUnmount(){
    window.localStorage.removeItem('unverifiedTime');
  }
//   goback账目列表
  goBack=()=> {
    this.setState({
    show: false,
    time:localStorage.getItem('unverifiedTime')
    })
  };

  handleSubmit = (values) => {
    const {pagination} = this.state;
    pagination.current=1;
    this.setState({pagination},()=>{
      this.searchOrder(values)
    });
  };

  // 重置
  onReset = () => {
    this.setState({
      dataSource : [],
      footer:()=>null
    })
  };

  // 搜索
  onSubmit = (values) => {
    this.searchOrder(values)
  };
  // 搜索
  searchOrder = (values) => {
      _fetch({
        url:'/Merchant/Userdeposit',
        data:{
          method:'approved',
          ...values
        },
        success:(data)=>{
          console.log('approved',data);
          this.setState({
            dataSource:data.data,
            cacheParams:{...values},
            footer:()=>{
              return(
                <div>
                  <div>
                    <div style={{float:'right',margin:'15px 60px 10px 0',color:'red'}}>
                      <div style={{marginBottom:'5px'}}>{_intl.get('order.totalamount')}：<span>{data.all.total}</span></div>
                      <div>{_intl.get('public.totalCount')}：<span>{data.all.count}</span></div>
                    </div>
                  </div>
                  <div style={{clear:'both'}}></div>
                  <div style={{float:'right'}}>
                    {_intl.get('public.total')}<span style={{color:'red'}}>{data.count}</span>{_intl.get('public.paginationData')}
                  </div>
                </div>
   
              )
            }
          })
        }
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
    const {dataSource,footer,id,show,time} = this.state;
    return(
      <div>
        {!show&&<div>
          <CustomBreadcrumb/>
          <IceContainer>
            <div>
            <Form onSubmit={this.onSubmit} onReset={this.onReset} getCards={this.getCards} time={time}/>
            <Table dataSource={dataSource} hasBorder={false}>
              <Table.Column
              key='id'
              dataIndex='id'
              width={100}
              title={_intl.get('public.id')}
              />
              <Table.Column
              key='amount'
              dataIndex='amount'
              width={100}
              title={_intl.get('order.amount')}
              />
              <Table.Column
              key='orderid'
              dataIndex='orderid'
              width={100}
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
              width={120}
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
              key='expired'
              dataIndex='expired'
              width={100}
              title={_intl.get('public.expired')}
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
            {footer()}
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

export default connect(mapStatToProp)(Unverified);
const styles = {
  tatalamount:{
    textAlign: 'right',
    paddingTop: '26px',
    color:'red',
    marginRight:'60px'
  }
};