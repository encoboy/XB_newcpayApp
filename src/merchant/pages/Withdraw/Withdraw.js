

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import UserForm from './components/UserForm';


export default class Withdraw extends Component {
  static displayName = 'Withdraw';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '我的钱包', link: '' },
      { text: '提现申请', link: '#/wallet/withdraw' },
    ];
    return (
      <div className="create-user-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <UserForm  history={this.props.history} />
      </div>
    );
  }
}
