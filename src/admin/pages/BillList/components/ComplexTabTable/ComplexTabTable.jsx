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
      activeKey:'admin',
    }
  }
  //选项卡切换
  handleTabChange = (activeKey) => {
    this.setState({
      activeKey,
    })
  };


  render() {
    const {activeKey} = this.state;
    return (
      <div className="tab-table">
        <IceContainer>
          <Tab activeKey={activeKey} onChange={this.handleTabChange}>
            <Tab.TabPane key='admin' tab={_intl.get('bill.admin')} >
              {activeKey==='admin'&&
              <Table platform='admin'/>
              }
            </Tab.TabPane>
            <Tab.TabPane key='agent' tab={_intl.get('bill.agent')} >
              {activeKey==='agent'&&
              <Table platform='agent'/>
              }
            </Tab.TabPane>
            <Tab.TabPane key='merchant' tab={_intl.get('bill.merchant')} >
              {activeKey==='merchant'&&
              <Table platform='merchant'/>
              }
            </Tab.TabPane>
          </Tab>
        </IceContainer>
      </div>
    );
  }
}
