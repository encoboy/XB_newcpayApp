import React, { Component } from 'react';
import { Table,Pagination,Button } from '@icedesign/base';
import Form from '../../Form'
import Detail from '../../DetailTable'
import {isEmptyObject} from '../../../../../util'

export default class CustomTable extends Component {
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
      count:null,
      userData:[]
    };
  }
  componentDidMount(){
    this.getCards();
    this.getUser();
  }
  getCards = () => {
    const {pagination:{current,pageSize}} = this.state;
    _fetch({
      url:'/Merchant/Bankaccount',
      data:{
        method:'allaccounts',
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
      url:'/Merchant/Bankaccount',
      data:{
        method:'searchaccount',
        page:current,
        size:pageSize,
        type:values.type?values.type:undefined,
        number:values.number?values.number:undefined
      },
      success:(data)=>{
        this.setState({
          dataSource:Array.isArray(data.data)?data.data:[],
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
  showDetails=(id)=>{
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
  // 得到所有用户
  getUser = () => {
    _fetch({
      url:'/Merchant/User',
      data:{
        method:'getusers'
      },
      success:(data)=>{
        console.log('getusers',data);
        this.setState({
          userData:data.users
        })
      }
    })
  }
  render() {
    const {dataSource,pagination,showDetails,id,count,userData } = this.state;
    // const data = [
    //   {
    //     "id":1,
    //     "bank":"zhongguo",
    //     "accessname":"kkk",
    //     "accessphone":12121121
    //   },
    // ];
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
              key='bank'
              dataIndex='bank'
              width={100}
              title={_intl.get('bank.bank')}
              cell={(text,index,record)=>(
                <div>{text&&text.toUpperCase()} {record.number}</div>
              )}
            />
            <Table.Column
              key='accessname'
              dataIndex='accessname'
              width={100}
              title={_intl.get('public.username')}
              cell={text => text&&text.toUpperCase()}
            />
            <Table.Column
              key='fee'
              dataIndex='fee'
              width={100}
              title={_intl.get('bank.fee_mony')}
            />
            <Table.Column
              key='accessphone'
              dataIndex='accessphone'
              width={100}
              title={_intl.get('bank.phone')}
            />
            <Table.Column
              key='type'
              dataIndex='type'
              width={100}
              title={_intl.get('bank.type')}
              cell={(text)=>_intl.get(`bank.${text}`)}
            />
            <Table.Column
            key='current_balance'
            dataIndex='current_balance'
            width={100}
            title={_intl.get('bank.current_balance')}
            />
            <Table.Column
              key='available_balance'
              dataIndex='available_balance'
              width={100}
              title={_intl.get('bank.available_balance')}
            />
            <Table.Column
              key='cur_transfer'
              dataIndex='cur_transfer'
              width={100}
              title={_intl.get('bank.cur_transfer')}
            />
            <Table.Column
              key='cur_times'
              dataIndex='cur_times'
              width={100}
              title={_intl.get('bank.cur_times')}
            />
            <Table.Column
            key='status'
            dataIndex='status'
            width={100}
            title={_intl.get('bank.status')}
            cell={(text)=>_intl.get(`bank.status${text}`)}
            />
            <Table.Column
            key='task_status'
            dataIndex='task_status'
            width={100}
            title={_intl.get('bank.task_status')}
            cell={(text)=>_intl.get(`bank.status${text}`)}
            />
            {/*<Table.Column*/}
              {/*key='created'*/}
              {/*dataIndex='created'*/}
              {/*title={_intl.get('public.created')}*/}
              {/*width={100}*/}
              {/*cell={(text)=>new Date(text*1000).toLocaleString('chinese',{hour12:false})}*/}
            {/*/>*/}
            <Table.Column
              key='updated'
              dataIndex='updated'
              title={_intl.get('public.updated')}
              width={100}
              // cell={(text)=>new Date(text*1000).toLocaleString('chinese',{hour12:false})}
            />
            <Table.Column
              key='action'
              dataIndex='action'
              title={_intl.get('public.action')}
              width={100}
              cell={(text,index,record)=><Button type='normal' shape='text' onClick={()=>this.showDetails(record.id)}>{_intl.get('public.detail')}</Button>}
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
            <Detail id={id} goBack={this.goBack} userData={userData}/>
        }
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
