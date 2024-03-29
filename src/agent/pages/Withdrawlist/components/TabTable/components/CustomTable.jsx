import React, { Component } from 'react';
import { Table,Pagination ,Button,Dialog,Select} from '@icedesign/base';
import Form from '../../Form'
import Details from '../../../../../components/DetailTable';
import {isEmptyObject,hasAction} from '../../../../../util'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import Img from './Img/Img';

 class CustomTable extends Component {
  static displayName = 'CustomTable';

  constructor(props) {
    super(props);
    this.state = {
      dataSource:[],
      optional:[],
      cacheParams:{},
      id:'',
      show:false,
      lang:{
        "zh-cn":'cn',
        "en-us":'en',
      },
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
    this.getOptional()
  }
  getCards = () => {
    const {pagination:{current,pageSize}} = this.state;
    _fetch({
      url:'/Merchant/Userwithdraw',
      data:{
        method:'getwithdrawlist',
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
          is_pagealltotal:false,
          is_getpagealltotal:true,
          getalltotal:data.alltotal,
          getpagetotal:data.pagetotal,
          count:data.count
        })
      }
    })
  };
  getOptional = () => {
    _fetch({
      url:'/Merchant/Optional',
      data:{
        method:'getoptional',
        group:'withdraw',
        // merchantid
      },
      success:(data)=>{
        this.setState({
          optional:data.data,
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
      url:'/Merchant/Userwithdraw',
      data:{
        method:'searchwithdrawbystatus',
        page:current,
        size:pageSize,
        ...values
      },
      success:(data)=>{
        console.log(data);
        const pagination = { ...this.state.pagination };
        pagination.total = data.count;
        this.setState({
          dataSource:data.data,
          cacheParams:{...values},
          alltotal:data.alltotal,
          pagetotal:data.pagetotal,
          is_pagealltotal:true,
          pagination,
          is_getpagealltotal:false,
          count:data.count
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
  showDetails = (id)=>{
    this.setState({
      id,show:true
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
  render() {
    const {btn} = this.props;
    const {dataSource,pagination,show ,
      id,is_getpagealltotal,getalltotal,getpagetotal,
      alltotal,pagetotal,is_pagealltotal,count} = this.state;
    const {language} = this.props;
    return(
      <div>
        {!show&&
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
              cell={(text)=>text&&text.toUpperCase()}
            />
            <Table.Column
              key='type'
              dataIndex='type'
              width={100}
              title={_intl.get('public.type')}
              cell={text => _intl.get(`withdraw.${text}`)}
            />
            <Table.Column
            key='amount'
            dataIndex='amount'
            width={100}
            title={_intl.get('withdraw.amount')}
            />
            <Table.Column
            key='extra'
            dataIndex='extra'
            width={80}
            title={_intl.get('transfer.extra')}
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
              width={100}
              title={_intl.get('public.status')}
              cell={text=>_intl.get(`status.${text}`)}
            />

            {/*<Table.Column
              key='comment'
              dataIndex='comment'
              width={100}
              title={_intl.get('withdraw.comment')}
              cell={text=>{
                const optionalItem =  optional.filter(function (item) {
                  return (item[`content_cn`] === text)||(item[`content_en`] === text)
                })[0];
                return optionalItem?optionalItem[`content_${lang[language]}`]:text
              }}
            />*/}
            <Table.Column
            key='description'
            dataIndex='description'
            width={100}
            title={_intl.get('public.description')}
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
        </div>
        }
        {
          show&&
            <Details id={id} goBack={this.goBack}/>
        }
      </div>
    );
  }
}

const mapStateToProps = (state,props) => {
  return {
    btn:state.operation.btn,
    language:state.language
  }
};

export default connect(mapStateToProps)(CustomTable)

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
