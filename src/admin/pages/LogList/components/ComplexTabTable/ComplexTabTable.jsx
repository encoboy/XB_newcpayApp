/* eslint no-underscore-dangle:0 */
import React, { Component } from 'react';
import { Table, Pagination, Tab,Button } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import Form from '../Form'

import './ComplexTabTable.scss'


export default class ComplexTabTable extends Component {
  static displayName = 'ComplexTabTable';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      activeKey:'Apilogs',
      dataSource:[],
      cacheParams:{},
      pagination:{
        current:1,
        pageSize:20,
        total:0
      }
    }
  }

  handleTabChange = (activeKey) => {
    this.setState({
      activeKey,
    },()=>{
      this.onReset()
    })
  };

  //分页切换
  handleChange = (current) =>{
    const {pagination,cacheParams} = this.state;
    pagination.current = current;
    this.setState({
      pagination
    },()=>{
      this.searchOrder(cacheParams)
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
  searchOrder = (values) => {
    const {pagination:{current,pageSize},activeKey} = this.state;
    _fetch({
      url:`/Manager/${activeKey}`,
      data:{
        method:'searchlogs',
        page:current,
        size:pageSize,
        ...values
      },
      success:(data)=>{
        console.log('searchlogs',data);
        const {pagination} = this.state;
        pagination.total=data.count?data.count:0;
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
    pagination.total = 0;
    this.setState({
      dataSource:[],
      cacheParams:{},
      pagination
    })
  };
  toggleFormat = (id) => {
    const text = document.querySelector(`#text-${id}`);
    text.classList.toggle('format')
  };
  render() {
    const {activeKey,dataSource,pagination} = this.state;
    return (
      <div className="complex-tab-table">
        <IceContainer>
          <div>
            <Tab activeKey={activeKey} onChange={this.handleTabChange}>
              <Tab.TabPane key='Apilogs' tab={_intl.get('log.log')}>
                {activeKey==='Apilogs'&&
                <div style={{marginTop:'25px'}}>
                  <Form onSubmit={this.onSubmit} onReset={this.onReset} />
                </div>
                }
              </Tab.TabPane>
              <Tab.TabPane key='Apierrorlogs' tab={_intl.get('log.errorlog')}>
                {activeKey==='Apierrorlogs'&&
                <div style={{marginTop:'25px'}}>
                  <Form onSubmit={this.onSubmit} onReset={this.onReset} />
                </div>
                }
              </Tab.TabPane>
            </Tab>
            <Table
              dataSource={dataSource}
              hasBorder={false}
              expandedRowRender={(record)=>{
                return (
                <div id={`text-${record.id}`} onDoubleClick={()=>this.toggleFormat(record.id)}>
                  <p style={{ lineHeight:'25px',marginBottom:'0' }}> <strong>{_intl.get('log.params')}: </strong>  {JSON.stringify(JSON.parse(record.params),null,4)}</p>
                  <p style={{ lineHeight:'25px',marginBottom:'0' }}> <strong >{_intl.get('log.output')}: </strong> {record.output}</p>
                </div>
              )}}
            >
              <Table.Column
                key='id'
                dataIndex='id'
                width={100}
                title={_intl.get('public.id')}
              />
              <Table.Column
                key='userid'
                dataIndex='userid'
                width={100}
                title={_intl.get('log.userid')}
              />
              <Table.Column
                key='appname'
                dataIndex='appname'
                width={100}
                title={_intl.get('log.appname')}
              />
              <Table.Column
                key='serverip'
                dataIndex='serverip'
                width={100}
                title={_intl.get('log.serverip')}
                // cell={(text)=>_intl.get(`order.${text}`)}
              />
              <Table.Column
                key='clientip'
                dataIndex='clientip'
                width={100}
                title={_intl.get('log.clientip')}
              />
              <Table.Column
                key='status'
                dataIndex='status'
                width={100}
                title={_intl.get('public.status')}
              />
              <Table.Column
                key='service'
                dataIndex='service'
                width={100}
                title={_intl.get('log.service')}
              />
              <Table.Column
                key='action'
                dataIndex='action'
                width={100}
                title={_intl.get('log.action')}
              />
              <Table.Column
                key='code'
                dataIndex='code'
                width={100}
                title={_intl.get('log.code')}
              />
              <Table.Column
                key='timems'
                dataIndex='timems'
                title={_intl.get('log.timems')}
                width={100}
              />
              <Table.Column
                key='type'
                dataIndex='type'
                title={_intl.get('public.type')}
                width={100}
              />
              <Table.Column
                key='created'
                dataIndex='created'
                title={_intl.get('public.created')}
                width={100}
                cell={(text)=>new Date(text*1000).toLocaleString('chinese',{hour12:false})}
              />
              {/*<Table.Column*/}
              {/*key='updated'*/}
              {/*dataIndex='updated'*/}
              {/*title={_intl.get('public.updated')}*/}
              {/*width={100}*/}
              {/*cell={(text)=>new Date(text*1000).toLocaleString('chinese',{hour12:false})}*/}
              {/*/>*/}
              {/*<Table.Column*/}
              {/*key='action'*/}
              {/*dataIndex='action'*/}
              {/*title={_intl.get('public.action')}*/}
              {/*width={100}*/}
              {/*cell={(text,index,record)=> <Button  type="normal" shape="text"  onClick={()=>this.showDetails(record.id)}>{_intl.get('public.detail')}</Button>}*/}
              {/*/>*/}
            </Table>
            <div style={styles.pagination}>
              <Pagination {...pagination} hideOnlyOnePage onChange={this.handleChange} />
            </div>
          </div>
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
