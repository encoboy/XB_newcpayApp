import React, { Component } from 'react';
import { Table,Pagination ,Button,Switch,Tab} from '@icedesign/base';
import IceContainer from '@icedesign/container';
import Form from '../../Form'
import DetailsUser from '../../Details';
import Details from '../../../../../components/Details/Details';
import {isEmptyObject,hasAction} from '../../../../../util'
import Unchecked from '../../Unchecked';
import {connect} from 'react-redux';

const TabPane = Tab.TabPane;
const {Item} = Details;

class CustomTable extends Component {
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
      }
    };
  }
  componentDidMount(){
    this.getCards()
  }
  getCards = () => {
    const {pagination:{current,pageSize}} = this.state;
    _fetch({
      url:'/Merchant/User',
      data:{
        method:'allusers',
        page:current,
        size:pageSize
      },
      success:(data)=>{
        console.log('allusers',data);
        const {pagination} = this.state;
        pagination.total = data.count;
        this.setState({
          dataSource:data.data,
          pagination
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
      url:'/Merchant/User',
      data:{
        method:'searchuser',
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
  updateStatus=(userid ,status)=>{
    _fetch({
      url:'/Merchant/User',
      data:{
        method:'updateuser',
        userid ,
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
  updateNoticeStatus = (userid,notice_status) =>  {
    _fetch({
      url:'/Merchant/Notice',
      data:{
        method:'setstatus',
        userid,
        notice_status
      },
      success:(data)=>{
        console.log('setStatus',data);
        const {cacheParams} = this.state;
        if (isEmptyObject(cacheParams)) {
          this.getCards();
          return;
        }
        this.searchwithdraw(cacheParams)
      }
    })
  }
  render() {
    const {dataSource,pagination,showDetails ,id,activeKey,username} = this.state;
    const {btn} = this.props;
    return(
      <div>
        {!showDetails&&
          <div>
            <Tab activeKey={activeKey} onChange={this.handleTabChange}>
              <TabPane key='all' tab={_intl.get('public.all')} />
              <TabPane key='is_no' tab={_intl.get('public.is_no')} />

            </Tab>
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
                      title={_intl.get('public.username')}
                      cell={text => text.toUpperCase()}
                    />
                    <Table.Column
                      key='nickname'
                      dataIndex='nickname'
                      width={100}
                      title={_intl.get('public.nickname')}
                      cell={text => text.toUpperCase()}
                    />
                    <Table.Column
                      key='balance'
                      dataIndex='balance'
                      width={100}
                      title={_intl.get('public.balance')}
                    />
                    <Table.Column
                      key='status'
                      dataIndex='status'
                      width={100}
                      title={`${_intl.get('usercard.1')}/${_intl.get('usercard.2')}`}
                      cell={(text,index,record)=>{
                        return <Switch checked={text===1} onChange={()=>this.updateStatus(record.id,text===1?2:1)}/>
                      }}
                    />
                    {/*<Table.Column
                      key='notice_status'
                      dataIndex='notice_status'
                      width={100}
                      title={`${_intl.get('usercard.noticeClose')}/${_intl.get('usercard.noticeoppen')}`}
                      cell={(text,index,record)=>{
                        return <Switch checked={text===1} onChange={()=>this.updateNoticeStatus(record.id,text===1?0:1)}/>
                      }}
                    />*/}
                    <Table.Column
                      key='mobile'
                      dataIndex='mobile'
                      width={100}
                      title={_intl.get('public.phone')}
                    />
                    <Table.Column
                      key='email'
                      dataIndex='email'
                      width={100}
                      title={_intl.get('public.email')}
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
                      dataIndex='action'
                      title={_intl.get('public.action')}
                      width={100}
                      cell={(text,index,record)=><Button type='normal' shape='text' onClick={()=>this.showDetails(record.id,record.username)}>{_intl.get('public.detail')}</Button>}
                    />
                  </Table>

                  <div style={{marginTop:'15px',textAlign:'right'}}>
                    <Pagination {...pagination} hideOnlyOnePage={true} onChange={this.handleChange}/>
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

const mapStateToProp = (state) => {
  return{
    btn:state.operation.btn,
    language:state.language
  }
}


export default connect(mapStateToProp)(CustomTable);

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
