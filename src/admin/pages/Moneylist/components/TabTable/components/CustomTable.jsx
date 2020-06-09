import React, { Component } from 'react';
import { Table,Pagination ,Button,Feedback,Dialog,Select,Loading} from '@icedesign/base';
import {isEmptyObject,hasAction} from '../../../../../util'
import {connect} from 'react-redux'
import Addrunwater from '../../Addrunwater/Addrunwter';
import Img from './Img/Img';
const Toast = Feedback.toast;
import Form from '../../Form/index';

 class CustomTable extends Component {
  static displayName = 'CustomTable';

  constructor(props) {
    super(props);
    this.state = {
      dataSource:[],
      optional:[],
      cacheParams:{},
      id:'',
      showDetails:false,
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
    console.log(this.props)
    this.getCards();
  }
  getCards = () => {
    const {pagination:{current,pageSize}} = this.state;
    const {currencyid} = this.props;
    _fetch({
      url:'/Manager/Wallettrx',
      data:{
        method:'getwallettrx',
        page:current,
        size:pageSize,
        currencyid
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
    const {currencyid} = this.props;
    _fetch({
      url:'/Manager/Wallettrx',
      data:{
        method:'searchwallettrx',
        page:current,
        size:pageSize,
        currencyid,
        ...values
      },
      success:(data)=>{
        console.log(data);
        const {pagination} = this.state;
        pagination.total=data.count;
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
  // doWithdraw=(status,withdrawid,merchantid )=>{
  //   const lang = this.state.lang;
  //   const language = this.props.language;
  //   let comment = '';
  //   Dialog.confirm({
  //     title:_intl.get('withdraw.comment'),
  //     content:(
  //       <Select style={{minWidth:'300px'}} onChange={val=>comment=val}>
  //         {
  //           this.state.optional.map(function (item,index) {
  //             return(
  //               <Select.Option value={item[`content_${lang[language]}`]}>{item[`content_${lang[language]}`]}</Select.Option>
  //             )
  //           })
  //         }
  //       </Select>
  //     ),
  //     onOk:()=>{
  //       _fetch({
  //         url:'/Manager/UserWithdraw',
  //         data:{
  //           method:'addwithdraw',
  //           status,
  //           withdrawid,
  //           comment
  //         },
  //         success:()=>{
  //           Toast.success(_intl.get('public.success'));
  //           const {cacheParams} = this.state;
  //           if(isEmptyObject(cacheParams)){
  //             this.getCards();
  //             return;
  //           }
  //           this.searchwithdraw(cacheParams)
  //         }
  //       })
  //     }
  //   })
  // };
  showDetails = (id)=>{
    this.setState({
      id,showDetails:true
    })
  };
  goBack=()=> {
    this.setState({
      showDetails: false
    }, () => {
      const {cacheParams} = this.state;
      if (isEmptyObject(cacheParams)) {
        this.getCards();
        return;
      }
      this.searchwithdraw(cacheParams)
    })
  };
  // 添加流水
  addrunwater = () => {
    this.setState({
      showDetails:true
    })
  }
  render() {
    const {dataSource,pagination,showDetails ,id,is_getpagealltotal,getalltotal,getpagetotal,alltotal,pagetotal,is_pagealltotal,count} = this.state;
    const {language,btn} = this.props;
    return(
      <div>
        {!showDetails&&
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
              key='openbal'
              dataIndex='openbal'
              width={100}
              title={_intl.get('wallet.openbal')}
            />
            <Table.Column
              key='total'
              dataIndex='total'
              width={120}
              title={_intl.get('wallet.total')}
            />
            <Table.Column
              key='balance'
              dataIndex='balance'
              width={100}
              title={_intl.get('wallet.balance')}
            />
            <Table.Column
              key='amt'
              dataIndex='amt'
              width={140}
              title={_intl.get('wallet.amt')}
            />
            <Table.Column
              key='fee'
              dataIndex='fee'
              width={100}
              title={_intl.get('wallet.fee')}
            />
            <Table.Column
            key='description'
            dataIndex='description'
            width={100}
            title={_intl.get('wallet.description')}
            />
            <Table.Column
            key='resit_url'
            dataIndex='resit_url'
            width={100}
            title={_intl.get('wallet.logo')}
            cell={(text,record)=>{
              
              return (text&&<Img text={text}/>)
            }}
            />
            <Table.Column
            key='add_date'
            dataIndex='add_date'
            title={_intl.get('wallet.add_date')}
            width={80}
            />
            <Table.Column
            key='created'
            dataIndex='created'
            title={_intl.get('public.created')}
            width={100}
            cell={(text)=>new Date(text*1000).toLocaleString('chinese',{hour12:false})}
            />
            <Table.Column
              key='updated'
              dataIndex='updated'
              title={_intl.get('public.updated')}
              width={100}
              cell={(text)=>new Date(text*1000).toLocaleString('chinese',{hour12:false})}
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
          showDetails&&
            <Addrunwater id={id} goBack={this.goBack}/>
        }
      </div>
    );
  }
}

const mapStateToProps = (state,props) => {
  return {
    language:state.language,
    btn:state.operation.btn
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
