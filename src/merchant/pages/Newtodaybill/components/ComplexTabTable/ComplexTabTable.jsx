/* eslint no-underscore-dangle:0 */
import React, { Component } from 'react';
import { Table, Pagination, Tab ,Button,moment} from '@icedesign/base';
import IceContainer from '@icedesign/container';
// import SubCategoryItem from './SubCategoryItem';
// import NormalForm from '../Form/Normal'
// import AdvancedForm from '../Form/Advanced'
import {isEmptyObject} from '../../../../util'
import Deatils from '../DetailTable';
import Form from '../Form/index';
import './ComplexTabTable.scss'


export default class ComplexTabTable extends Component {
  static displayName = 'ComplexTabTable';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      activeKey:'transfer',
      searchType:'normal',
      id:'',
      showDeatils:false,
      dataSource:[],
      bank:[],
      status:[],
      cacheParams:{},
      pagination:{
        current:1,
        pageSize:20,
        total:0
      }
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
  // searchChange = (searchType) => {
  //   this.setState({searchType})
  // };
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
  // 得到列表数据
  getData = () => {
    const {pagination:{current,pageSize},activeKey} = this.state;
    _fetch({
      url:'/User/Userreport',
      data:{
        method:'getreport',
        page:current,
        size:pageSize,
        datetype:'today',
        type:activeKey
      },
      success:(data)=>{
        console.log(data)
        const {pagination} = this.state;
        // pagination.total=data.count;
        this.setState({
          dataSource:data.data,
          bank:data.banklist,
          status:data.statuslist,
          pagination
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
      url:'/User/Userreport',
      data:{
        method:'searchreport',
        page:current,
        size:pageSize,
        type:activeKey,
        datetype:'daily',
        ...values
      },
      success:(data)=>{
        const {pagination} = this.state;
        pagination.total=data.count;
        this.setState({
          dataSource:data.data,
          cacheParams:{...values},
          pagination
        })
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
  goBack=()=>{
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


  // 日期搜索
  handleSubmit = (values) => {
    const {pagination} = this.state;
    pagination.current=1;
    this.setState({pagination},()=>{
      this.searchOrder(values)
    });
  };
  handleReset = () => {
    const {pagination} = this.state;
    pagination.current=1;
    this.setState({
      cacheParams:{},
      pagination
    },()=>{
      this.getData()
    })
  };

  //重算
  againcount = (value) => {
    const {cacheParams} = this.state;
    _fetch({
      url:'/User/Userreport',
      data:{
        method:'recalculate',
        kind:'daily',
        type:'today',
        date:value
      },
      success:(data)=>{
        console.log('recalculate',data);
        if(isEmptyObject(cacheParams)){
          this.getData();
          return;
        };
        this.searchOrder(cacheParams);
      }
    })
  }
  render() {
    const tabs = [
      { tab: _intl.get('newtodaybill.2'), key: "transfer"},
      { tab: _intl.get('newtodaybill.3'), key: "withdraw"},
      { tab: _intl.get('newtodaybill.4'), key: "deposit"}
    ];
    const {activeKey,searchType,bank,status,dataSource,pagination,id,showDetails} = this.state;
    return (
      <div className="complex-tab-table">
        <IceContainer>
          {!showDetails&&
          <div>
            <Tab activeKey={activeKey} onChange={this.handleTabChange}>
              {tabs.map(item => (
                <Tab.TabPane key={item.key} tab={item.tab} />
              ))}
            </Tab>
            {/*<Form onSubmit={this.handleSubmit} onReset={this.handleReset}/>*/}
            {activeKey==='transfer'&&<Table dataSource={dataSource} hasBorder={false} >
            <Table.Column
              key='id'
              dataIndex='id'
              width={100}
              title={_intl.get('public.id')}
            />
            <Table.Column
              key='reportdate'
              dataIndex='reportdate'
              width={100}
              title={_intl.get('todayreport.reportdate')}
            />
            <Table.Column
              key='wallet_transfer_all'
              dataIndex='wallet_transfer_all'
              title={_intl.get('todayreport.wallet_transfer_all')}
              width={100}
            />
            <Table.Column
              key='wallet_transfer_amt'
              dataIndex='wallet_transfer_amt'
              title={_intl.get('todayreport.wallet_transfer_amt')}
              width={100}
            />
            
            <Table.Column
              key='wallet_transfer_fee'
              dataIndex='wallet_transfer_fee'
              title={_intl.get('todayreport.wallet_transfer_fee')}
              width={100}
            />
            <Table.Column
              key='wallet_transfer_extra'
              dataIndex='wallet_transfer_extra'
              title={_intl.get('todayreport.wallet_transfer_extra')}
              width={100}
            />
  
            </Table>}
            {activeKey==='withdraw'&&<Table dataSource={dataSource} hasBorder={false} >
            <Table.Column
              key='id'
              dataIndex='id'
              width={100}
              title={_intl.get('public.id')}
            />
            <Table.Column
            key='reportdate'
            dataIndex='reportdate'
            width={100}
            title={_intl.get('todayreport.reportdate')}
            />
            <Table.Column
            key='wallet_withdraw_all'
            dataIndex='wallet_withdraw_all'
            width={100}
            title={_intl.get('todayreport.wallet_withdraw_all')}
            />

            <Table.Column
              key='wallet_withdraw_extra'
              dataIndex='wallet_withdraw_extra'
              width={100}
              title={_intl.get('todayreport.wallet_withdraw_extra')}
            />
              
       
          </Table>}
          {activeKey==='deposit'&&<Table dataSource={dataSource} hasBorder={false} >
          <Table.Column
            key='id'
            dataIndex='id'
            width={100}
            title={_intl.get('public.id')}
          />
          <Table.Column
          key='reportdate'
          dataIndex='reportdate'
          width={100}
          title={_intl.get('todayreport.reportdate')}
          />
          <Table.Column
          key='wallet_deposit_all'
          dataIndex='wallet_deposit_all'
          width={100}
          title={_intl.get('todayreport.wallet_deposit_all')}
          />
          <Table.Column
          key='wallet_deposit_amt'
          dataIndex='wallet_deposit_amt'
          width={100}
          title={_intl.get('todayreport.wallet_deposit_amt')}
          />

          <Table.Column
            key='wallet_deposit_fee'
            dataIndex='wallet_deposit_fee'
            title={_intl.get('todayreport.wallet_deposit_fee')}
            width={100}
          />
          <Table.Column
            key='wallet_deposit_extra'
            dataIndex='wallet_deposit_extra'
            title={_intl.get('todayreport.wallet_deposit_extra')}
            width={100}
          />
   
        </Table>}
            <div style={styles.pagination}>
              <Pagination {...pagination} hideOnlyOnePage onChange={this.handleChange} />
            </div>
          </div>
          }
          {showDetails&&
          <Deatils id={id} goBack={this.goBack}/>
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
