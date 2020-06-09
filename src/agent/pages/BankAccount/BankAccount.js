

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import TabTable from './components/TabTable';


export default class BankAccount extends Component {
  static displayName = 'BankAccount';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '银行管理', link: '' },
      { text: '银行账号', link: '#/bank/account' },
    ];
    return (
      <div className="create-user-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <TabTable  history={this.props.history} />
      </div>
    );
  }
}
