import React, { Component } from 'react';
import { Table,Pagination,Button } from '@icedesign/base';
import Form from '../../Form'
import EyePassword from './EyePassword'
import Details from '../../DetailTable'
import {isEmptyObject,hasAction} from '../../../../../util'
import {connect} from 'react-redux';

 class CustomTable extends Component {
  static displayName = 'CustomTable';

  constructor(props) {
    super(props);
    this.state = {
      id:'',
      showDetails:false,
      dataSource:[],
      cacheParams:{},
      pagination:{
        current:1,
        pageSize:20,
        total:0
      },
      is_pagin:true,
      count:null,
      existCount:true
    };
  }
  componentDidMount(){
    this.getCards()
  }
  getCards = () => {
    const {pagination:{current,pageSize}} = this.state;
    _fetch({
      url:'/Manager/Bankaccess',
      data:{
        method:'allaccess',
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
          is_pagin:true,
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
    _fetch({
      url:'/Manager/Bankaccess',
      data:{
        method:'searchaccess',
        ...values
      },
      success:(data)=>{
        console.log(data);
        this.setState({
          dataSource:data.data,
          cacheParams:{...values},
          is_pagin:false,
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
  showDetails = (id)=>{
    this.setState({
      id,
      showDetails:true
    })
  };
  goBack=()=>{
    this.setState({
      showDetails:false
    },()=>{
      const {cacheParams} = this.state;
      if(isEmptyObject(cacheParams)){
        this.getCards();
        return;
      }
      this.searchwithdraw(cacheParams)
    })
  };
  render() {
    const {dataSource,pagination,showDetails,id,is_pagin ,count,existCount} = this.state;
    const {btn} = this.props;
    return(
      <div>
        {
          !showDetails&&
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
                  key='merchant_name'
                  dataIndex='merchant_name'
                  width={100}
                  title={_intl.get('wallet.merchantname')}
                  cell={(text)=>text&&text.toUpperCase()}
                />
                <Table.Column
                  key='name'
                  dataIndex='name'
                  width={100}
                  title={_intl.get('public.username')}
                  cell={(text)=>text&&text.toUpperCase()}
                />
                <Table.Column
                  key='password'
                  dataIndex='password'
                  width={100}
                  title={_intl.get('public.password')}
                  cell={(text)=><EyePassword text={text}/>}
                />
                <Table.Column
                  key='bank'
                  dataIndex='bank'
                  width={100}
                  title={_intl.get('bank.bank')}
                  cell={(text)=>text.toUpperCase()}
                />
                <Table.Column
                  key='phone'
                  dataIndex='phone'
                  width={100}
                  title={_intl.get('bank.phone')}
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
                  cell={(text,index,record)=>  hasAction(btn,'BankAccess_getaccess')&& <Button shape="text" onClick={()=>this.showDetails(record.id)}>{_intl.get('public.detail')}</Button>}
                />
              </Table>
              {existCount&&<div style={{marginTop:'15px',textAlign:'right'}}>
                <span>{_intl.get('public.total')} <span style={{color:'red'}}>{count}</span>
                  {_intl.get('public.paginationData')} </span>
                {(count>20&&is_pagin)&&<Pagination  style={{display:'inline',marginLeft:'10px'}} {...pagination} hideOnlyOnePage={true} onChange={this.handleChange}/>}
              </div>}
            </div>
        }
        {
          showDetails&&
          <Details id={id} goBack={this.goBack}/>
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
