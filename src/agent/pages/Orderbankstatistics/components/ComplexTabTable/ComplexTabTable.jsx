/* eslint no-underscore-dangle:0 */
import React, { Component } from 'react';
import { Table, Pagination, Tab ,Button} from '@icedesign/base';
import IceContainer from '@icedesign/container';
import './ComplexTabTable.scss';
import Deposit from '../Deposit/Todaycount'
import Withdraw from '../Withdraw/Todaycount';


export default class ComplexTabTable extends Component {
  static displayName = 'ComplexTabTable';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      activeKey:'4',
    }
  }
  //选项卡切换
  handleTabChange = (activeKey) => {
    console.log('activeKey：',activeKey);
    this.setState({
      activeKey
    },()=>{
      // this.getData()
    })
  };
  render() {
    const tabs = [
      { tab: _intl.get('bankstatistics.4'), key: "4"},
      { tab: _intl.get('bankstatistics.2'), key: "5"}
    ];
    const {activeKey} = this.state;
    let deposit = '4',withdraw = '5';
    return (
      <div className="complex-tab-table">
        <IceContainer>
          <div>
            <Tab activeKey={activeKey} onChange={this.handleTabChange}>
              {tabs.map(item => (
                <Tab.TabPane key={item.key} tab={item.tab} />
              ))}
            </Tab>
            {activeKey===deposit&&<Deposit/>}
            {activeKey===withdraw&&<Withdraw/>}
          </div>
        </IceContainer>
      </div>
    );
  }
}
