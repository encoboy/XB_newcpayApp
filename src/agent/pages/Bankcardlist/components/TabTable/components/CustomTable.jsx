import React, { Component } from 'react';
import { Table,Pagination ,Button,Switch,Tab} from '@icedesign/base';
import IceContainer from '@icedesign/container';
import Form from '../../Form'
import DetailsUser from '../../Details';
import Details from '../../../../../components/Details/Details';
import {isEmptyObject} from '../../../../../util'
import Unchecked from '../../Unchecked';

const TabPane = Tab.TabPane;
const {Item} = Details;

export default class CustomTable extends Component {
  static displayName = 'CustomTable';

  constructor(props) {
    super(props);
    this.state = {
      activeKey:'all',
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
      count:null
    };
  }
  componentDidMount(){
    this.getCards()
  }
  getCards = () => {
    const {pagination:{current,pageSize}} = this.state;
    _fetch({
      url:'/Merchant/Usercards',
      data:{
        method:'allcards',
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
  handleTabChange=(activeKey)=>{
    this.setState({activeKey},()=>{
      if(activeKey==='all'){
        this.handleReset()
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
      url:'/Merchant/Usercards',
      data:{
        method:'searchcards',
        page:current,
        size:pageSize,
        username:values.username?values.username:undefined,
        number:values.number?values.number:undefined,
        status:values.status?values.status:undefined,
        bank:values.bank?values.bank:undefined
      },
      success:(data)=>{
        console.log(data)
        const {pagination} = this.state;
        pagination.total=data.count
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
  updateStatus=(cardid ,status)=>{
    _fetch({
      url:'/Merchant/Usercards',
      data:{
        method:'updatestatus',
        cardid,
        status
      },
      success:(data)=>{
        console.log(data)
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
    const {dataSource,pagination,showDetails ,id,activeKey,username,count} = this.state;
    return(
      <div>
        {!showDetails&&
          <div>
            {/*<Tab activeKey={activeKey} onChange={this.handleTabChange}>
              <TabPane key='all' tab={_intl.get('public.all')} />
              <TabPane key='is_no' tab={_intl.get('public.is_no')} />

              </Tab>*/}
            {
              activeKey==='all'?
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
                      title={_intl.get('bankcardlist.username')}
                      cell={text => text&&text.toUpperCase()}
                    />
                    <Table.Column
                    key='bank'
                    dataIndex='bank'
                    width={100}
                    title={_intl.get('bankcardlist.bank')}
                    cell={text => text&&text.toUpperCase()}
                    />
                    <Table.Column
                      key='number'
                      dataIndex='number'
                      width={100}
                      title={_intl.get('bankcardlist.number')}
                    />
                    <Table.Column
                    key='holder'
                    dataIndex='holder'
                    width={100}
                    title={_intl.get('bankcardlist.holder')}
                    cell={text => text&&text.toUpperCase()}
                    />
                    <Table.Column
                      key='status'
                      dataIndex='status'
                      width={100}
                      title={`${_intl.get('usercard.1')}/${_intl.get('usercard.2')}`}
                      cell={(text,index,record)=>{
                        if(text){
                          return <Switch checked={text===1} onChange={()=>this.updateStatus(record.id,text===1?2:1)}/>
                        }else{
                          return _intl.get('bankcardlist.0');
                        }
                      }}
                    />
                    {/*<Table.Column
                    key='verifycode'
                    dataIndex='verifycode'
                    width={100}
                    title={_intl.get('bankcardlist.verifycode')}
                    />*/}
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
                      dataIndex='action'
                      title={_intl.get('public.action')}
                      width={100}
                      cell={(text,index,record)=>{
                        if(!record.status){
                          return <Button type='primary' size='small' onClick={()=>this.updateStatus(record.id,1)}>{_intl.get('public.pass')}</Button>
                        }
                      }}
                    />
                  </Table>

                  <div style={{marginTop:'15px',textAlign:'right'}}>
                  <span>{_intl.get('public.total')} <span style={{color:'red'}}>{count}</span>
                  {_intl.get('public.paginationData')} </span>
                  {count>20&&<Pagination style={{display:'inline',marginLeft:'10px'}} {...pagination} hideOnlyOnePage={true} onChange={this.handleChange}/>}
                  </div>
                </div>:
                <Unchecked />
            }
          </div>
        }
        {
          showDetails&&
            <DetailsUser id={id} username={username} goBack={this.goBack}/>
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
