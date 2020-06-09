/* eslint no-underscore-dangle:0 */
import React, { Component } from 'react';
import { Table, Pagination, Tab,Button } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import SubCategoryItem from './SubCategoryItem';
import NormalForm from '../Form/Normal'
import AdvancedForm from '../Form/Advanced'
import {isEmptyObject} from '../../../../util'
import Details from '../DetailTable'
import './ComplexTabTable.scss'


export default class ComplexTabTable extends Component {
  static displayName = 'ComplexTabTable';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      activeKey:'1',
      searchType:'normal',
      id:'',
      showDetails:false,
      dataSource:[],
      bank:[],
      status:[],
      cacheParams:{},
      pagination:{
        current:1,
        pageSize:20,
        total:0
      },
      count:''
    }
  }
  componentDidMount(){
    this.getData();
  }
  //选项卡切换
  handleTabChange = (activeKey) => {
    const {pagination} = this.state;
    pagination.current = 1;
    this.setState({
      pagination,
      activeKey,
      searchType:'normal',
      cacheParams:{}
    },()=>{
      this.getData()
    })
  };
  //搜索切换
  searchChange = (searchType) => {
    this.setState({searchType})
  };
  //分页切换
  handleChange = (current) =>{
    const {pagination,cacheParams} = this.state;
    pagination.current = current;
    this.setState({
      pagination
    },()=>{
      if(isEmptyObject(cacheParams)){
        this.getData();
        return;
      }
      this.searchOrder(cacheParams)
    })
  };
  getData = () => {
    const {pagination:{current,pageSize},activeKey} = this.state;
    _fetch({
      url:'/Manager/Order',
      data:{
        method:'searchorders',
        type:'advance',
        page:current,
        size:pageSize,
        "statuslist": "error"
      },
      success:(data)=>{
        console.log(data);
        const {pagination} = this.state;
        pagination.total=data.count;
        this.setState({
          dataSource:data.data,
          bank:data.banklist,
          status:data.statuslist,
          pagination,
          count:data.count
        })
      }
    })
  };
  onSubmit = (values) => {
    const {pagination} = this.state;
    pagination.current = 1;
    this.setState({
      pagination
    },()=>{this.searchOrder(values)})
  };
  //搜索
  searchOrder = (values ) => {
    const {pagination:{current,pageSize},activeKey} = this.state;
    _fetch({
      url:'/Manager/Order',
      data:{
        method:'searchorders',
        page:current,
        size:pageSize,
        ordertype:activeKey,
        ...values
      },
      success:(data)=>{
        console.log(data);
        const {pagination} = this.state;
        pagination.total=data.count;
        this.setState({
          dataSource:data.data,
          cacheParams:{...values},
          pagination
        })
      },
      error:(error)=>{
        console.lolg
      }
    })
  };
  onReset = () => {
    const {pagination} = this.state;
    pagination.current = 1;
    this.setState({
      searchType:'normal',
      cacheParams:{},
      pagination
    },()=>this.getData())
  };
  showDetails = (id)=>{
    this.setState({
      id,
      showDetails:true
    })
  };
  goBack = () =>{
    this.setState({
      showDetails:false
    },()=>{
      const {cacheParams} = this.state;
      if(isEmptyObject(cacheParams)){
        this.getData();
        return;
      }
      this.searchOrder(cacheParams)
    })
  };
  render() {
    const tabs = [
      { tab: _intl.get('order.1'), key: "1"},
      { tab: _intl.get('order.2'), key: "2"},
      { tab: _intl.get('order.3'), key: "3"},
      { tab: _intl.get('order.4'), key: "4"},
      { tab: _intl.get('order.5'), key: "5"},
    ];
    const {activeKey,searchType,bank,status,dataSource,pagination,id,showDetails,count} = this.state;
    return (
      <div className="complex-tab-table">
        <IceContainer>
          {!showDetails&&
          <div>
            <Table dataSource={dataSource} hasBorder={false} >
              <Table.Column
                key='id'
                dataIndex='id'
                width={70}
                title={_intl.get('public.id')}
              />
              <Table.Column
                key='thirdpartyid'
                dataIndex='thirdpartyid'
                width={120}
                title={_intl.get('order.thirdpartyid')}
                cell={(text)=>text&&text.toUpperCase()}
              />
              <Table.Column
                key='robotid'
                dataIndex='robotid'
                width={70}
                title={_intl.get('order.robotid')}
              />
              <Table.Column
                key='type'
                dataIndex='type'
                width={100}
                title={_intl.get('order.type')}
                cell={(text)=>_intl.get(`order.${text}`)}
              />
              {/*<Table.Column*/}
                {/*key='brand'*/}
                {/*dataIndex='brand'*/}
                {/*width={100}*/}
                {/*title={_intl.get('order.brand')}*/}
              {/*/>*/}
              <Table.Column
                key='code'
                dataIndex='code'
                width={100}
                title={_intl.get('order.code')}
                cell={(text)=><div>{text} {_intl.get(`code.${text}`)}</div>}
              />
              <Table.Column
                key='status'
                dataIndex='status'
                width={80}
                title={_intl.get('order.status')}
                cell={(text)=>_intl.get(`status.${text}`)}
              />
              <Table.Column
                key='index'
                dataIndex='index'
                width={100}
                title={_intl.get('order.index')}
              />
              <Table.Column
                key='amount'
                dataIndex='amount'
                width={80}
                title={_intl.get('order.amount')}
              />
              <Table.Column
                key='from_account'
                dataIndex='from_account'
                title={_intl.get('order.from_account')}
                width={110}
                cell={(text,index,record)=>(
                  <div>{record.from_bank.toUpperCase()} {record.from_account}</div>
                )}
              />
              <Table.Column
                key='to_account'
                dataIndex='to_account'
                title={_intl.get('order.to_account')}
                width={100}
                cell={(text,index,record)=>(
                  <div>{record.to_bank.toUpperCase()} {record.to_account}</div>
                )}
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
              cell={(text,index,record)=> <Button  type="normal" shape="text"  onClick={()=>this.showDetails(record.id)}>{_intl.get('public.detail')}</Button>}
              />
            </Table>
            <div style={styles.pagination}>
            <span>{_intl.get('public.total')} <span style={{color:'red'}}>{count}</span>
            {_intl.get('public.paginationData')} </span>
            {count>20&&<Pagination style={{display:'inline',marginLeft:'10px'}} {...pagination} hideOnlyOnePage={true} onChange={this.handleChange}/>}
            </div>
          </div>
          }
          {showDetails&&
          <Details id={id} goBack={this.goBack} />
          }
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  complexTabTableOperation: {
    lineHeight: '28px',
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    marginLeft: '10px',
    lineHeight: '20px',
  },
  operation: {
    marginRight: '12px',
    textDecoration: 'none',
  },
  tabExtra: {
    display: 'flex',
    alignItems: 'center',
  },
  search: {
    marginLeft: 10,
  },
  tabCount: {
    marginLeft: '5px',
    color: '#3080FE',
  },
  pagination: {
    textAlign: 'right',
    paddingTop: '26px',
  },
};
