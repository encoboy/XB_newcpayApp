/* eslint no-underscore-dangle:0 */
import React, { Component } from 'react';
import {Tab} from '@icedesign/base';
import IceContainer from '@icedesign/container';
import Table from '../Bill'
import './ComplexTabTable.scss'
import BankCard from '../Bill/index';


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
            <BankCard/>
        </IceContainer>
      </div>
    );
  }
}
