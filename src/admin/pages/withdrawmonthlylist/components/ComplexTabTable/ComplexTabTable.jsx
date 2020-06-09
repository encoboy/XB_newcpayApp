/* eslint no-underscore-dangle:0 */
import React, { Component } from 'react';
import {Tab} from '@icedesign/base';
import IceContainer from '@icedesign/container';
import Table from '../Bill'
import './ComplexTabTable.scss'


export default class ComplexTabTable extends Component {
  static displayName = 'ComplexTabTable';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      activeKey:'',
      currencyData:[],
    }
  }
  //选项卡切换
  handleTabChange = (activeKey) => {
    this.setState({
      activeKey,
    })
  };
  // 获取货币
  getCurrency = () => {
    _fetch({
      url:'/Manager/Merchant',
      data:{
        method:'currency'
      },
      success:(data)=>{
        console.log('currency',data);
        this.setState({
          currencyData:data.data,
          activeKey:data.data[0].id
        })
      }
    })
  }

  componentDidMount(){
      this.getCurrency();
  }


  render() {
    const {activeKey,currencyData} = this.state;
    return (
      <div className="tab-table">
        <IceContainer>
          <Tab activeKey={activeKey} onChange={this.handleTabChange}>
              {currencyData.map((item,index)=>{
                return(
                    <Tab.TabPane key={item.id} tab={item.code}>
                          <Table platform='admin' currencyid={item.id}/>
                    </Tab.TabPane>
                  )
              })}
            </Tab>
        </IceContainer>
      </div>
    );
  }
}