import React, { Component } from 'react';
import { Table,Pagination ,Button,Switch} from '@icedesign/base';
import Form from '../../Form'
import Details from '../../Details'
import {isEmptyObject,hasAction} from '../../../../../util'
import {connect} from 'react-redux'

 class CustomTable extends Component {
  static displayName = 'CustomTable';

  constructor(props) {
    super(props);
    this.state = {
      dataSource:[],
      cacheParams:{},
      id:'',
      username:'',
      showDetails:false,
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
      url:'/Manager/Merchant',
      data:{
        method:'allmerchants',
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
    _fetch({
      url:'/Manager/Merchant',
      data:{
        method:'searchmerchant',
        page:current,
        size:pageSize,
        ...values
      },
      success:(data)=>{
        const pagination = { ...this.state.pagination };
        pagination.total = data.count;
        this.setState({
          pagination,
          dataSource:data.data,
          cacheParams:{...values},
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
  showDetails = (id,username)=>{
    this.setState({
      id,
      username,
      showDetails:true
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
  updateStatus=(merchantid ,status)=>{
    _fetch({
      url:'/Manager/Merchant',
      data:{
        method:'updatemerchant',
        merchantid ,
        status
      },
      success:()=>{
        const {cacheParams} = this.state;
        if (isEmptyObject(cacheParams)) {
          this.getCards();
          return;
        }
        this.searchwithdraw(cacheParams)
      }
    })
  };
  render() {
    const {dataSource,pagination,showDetails ,id,username,count} = this.state;
    const {btn} = this.props;
    return(
      <div>
        {!showDetails&&
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
              title={_intl.get('public.username')}
              cell={text => text.toUpperCase()}
            />
            <Table.Column
              key='nickname'
              dataIndex='nickname'
              width={100}
              title={_intl.get('merchantlist.nickname')}
              cell={text => text.toUpperCase()}
            />
            <Table.Column
              key='status'
              dataIndex='status'
              width={100}
              title={`${_intl.get('usercard.1')}/${_intl.get('usercard.2')}`}
              cell={(text,index,record)=>{
                // if(!text){
                //   return <span style={styles.noChecked}>{_intl.get('usercard.0')}</span>
                // }
                return <Switch checked={text===1} disabled={!hasAction(btn,'Merchant_updatemerchant')} onChange={()=>this.updateStatus(record.id,text===1?2:1)}/>
              }}
            />
            <Table.Column
              key='mobile'
              dataIndex='mobile'
              width={100}
              title={_intl.get('merchantlist.phone')}
            />
            <Table.Column
              key='email'
              dataIndex='email'
              width={100}
              title={_intl.get('merchantlist.email')}
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
            <Table.Column
              key='action'
              dataIndex='action'
              title={_intl.get('public.action')}
              width={100}
              cell={(text,index,record)=><Button type='normal' shape='text' onClick={()=>this.showDetails(record.id,record.username)}>{_intl.get('public.detail')}</Button>}
            />
          </Table>
          <div style={{marginTop:'15px',textAlign:'right'}}>
          <span>{_intl.get('public.total')} <span style={{color:'red'}}>{count}</span>
          {_intl.get('public.paginationData')} </span>
          {count>20&&<Pagination style={{display:'inline',marginLeft:'10px'}} {...pagination} hideOnlyOnePage={true} onChange={this.handleChange}/>}
          </div>
        </div>
        }
        {
          showDetails&&
            <Details id={id} username={username} goBack={this.goBack}/>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
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
  }
};
