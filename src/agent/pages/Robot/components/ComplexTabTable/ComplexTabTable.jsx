/* eslint no-underscore-dangle:0 */
import React, { Component } from 'react';
import { Table, Pagination, Tab ,Button} from '@icedesign/base';
import IceContainer from '@icedesign/container';
import Form from '../Form'
import Details from '../DetailTable'
import Log from '../Log'
import {isEmptyObject,hasAction} from '../../../../util'
import './ComplexTabTable.scss';
import {connect} from 'react-redux';

class ComplexTabTable extends Component {
  static displayName = 'ComplexTabTable';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      activeKey:'2',
      dataSource:[],
      cacheParams:{},
      showDetails:false,
      id:'',
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
      cacheParams:{}
    },()=>{
      this.getData()
    })
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
      url:'/Merchant/Robot',
      data:{
        method:'getrobotlist',
        page:current,
        size:pageSize,
        type:activeKey
      },
      success:(data)=>{
        const {pagination} = this.state;
        pagination.total=data.count;
        this.setState({
          dataSource:data.data,
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
    const {activeKey} = this.state;
    _fetch({
      url:'/Merchant/Robot',
      data:{
        method:'searchrobot',
        type:activeKey,
        ...values
      },
      success:(data)=>{
        this.setState({
          dataSource:Array.isArray(data.data)?data.data:[data.data],
          cacheParams:{...values},
        })
      }
    })
  };
  onReset = () => {
    const {pagination} = this.state;
    pagination.current = 1;
    this.setState({
      cacheParams:{},
      pagination
    },()=>this.getData())
  };
  showDetails = (id) => {
    this.setState({
      showDetails:true,
      id
    })
  };
  goBack = () => {
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
    const {btn} = this.props;
    const tabs = [
      { tab: _intl.get('robot.2'), key: "2"},
      { tab: _intl.get('robot.3'), key: "3"},
      { tab: _intl.get('robot.4'), key: "4"},
    ];
    const {activeKey,dataSource,pagination,showDetails,id} = this.state;
    return (
      <div className="tab-table">
        <IceContainer>
          {!showDetails&&
          <div className='tab-list'>
            <Tab activeKey={activeKey} onChange={this.handleTabChange}>
              {tabs.map(item => (
                <Tab.TabPane key={item.key} tab={item.tab} />
              ))}
            </Tab>
            <div>
              <div style={{marginTop:'25px'}}>
                <Form  onSubmit={this.onSubmit} onReset={this.onReset} />
              </div>
              <Table dataSource={dataSource} hasBorder={false} >
                <Table.Column
                  key='id'
                  dataIndex='id'
                  width={100}
                  title={_intl.get('public.id')}
                />
                <Table.Column
                  key='serverid'
                  dataIndex='serverid'
                  width={100}
                  title={_intl.get('robot.serverid')}
                />
                <Table.Column
                  key='type'
                  dataIndex='type'
                  width={100}
                  title={_intl.get('robot.type')}
                  cell={(text)=>_intl.get(`robot.${text}`)}
                />
                <Table.Column
                  key='name'
                  dataIndex='name'
                  width={100}
                  title={_intl.get('robot.name')}
                />
                <Table.Column
                  key='accountid'
                  dataIndex='accountid'
                  width={100}
                  title={_intl.get('robot.accountid')}
                />
                <Table.Column
                  key='status'
                  dataIndex='status'
                  width={100}
                  title={_intl.get('public.status')}
                />
                <Table.Column
                  key='taskcount'
                  dataIndex='taskcount'
                  width={100}
                  title={_intl.get('robot.taskcount')}
                />
                <Table.Column
                  key='extend'
                  dataIndex='extend'
                  width={100}
                  title={_intl.get('robot.extend')}
                />
                <Table.Column
                  key='ip'
                  dataIndex='ip'
                  width={100}
                  title={_intl.get('robot.ip')}
                />
                <Table.Column
                  key='port'
                  dataIndex='port'
                  title={_intl.get('robot.port')}
                  width={100}
                />
                <Table.Column
                  key='publicip'
                  dataIndex='publicip'
                  title={_intl.get('robot.publicip')}
                  width={100}
                />
                <Table.Column
                  key='publicport'
                  dataIndex='publicport'
                  title={_intl.get('robot.publicport')}
                  width={100}
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
                  cell={(text,index,record)=> <Button  type="normal" shape="text"  onClick={()=>this.showDetails(record.id)}>{_intl.get('public.detail')}</Button>}
                />
              </Table>
              <div style={styles.pagination}>
                <Pagination {...pagination} hideOnlyOnePage onChange={this.handleChange} />
              </div>
            </div>
          </div>
          }
          {showDetails&&
          <div>
            <Tab tabBarExtraContent={ <Button  type="normal" shape="text"  onClick={this.goBack}>{_intl.get('public.back')}</Button>}>
              <Tab.TabPane key={1} tab={_intl.get('robot.info')} >
                <Details id={id}/>
              </Tab.TabPane>
              {hasAction(btn,'Robot_getrobotlog')&&<Tab.TabPane key={2} tab={_intl.get('robot.log') } >
                <Log id={id}/>
              </Tab.TabPane>}
            </Tab>
          </div>
          }
        </IceContainer>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    btn: state.operation.btn,
    language:state.language
  }
}

export default connect(mapStateToProps)(ComplexTabTable);

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
