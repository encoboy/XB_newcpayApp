

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import TabTable from './components/TabTable';


export default class BankToken extends Component {
  static displayName = 'BankToken';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '银行管理', link: '' },
      { text: '银行token', link: '#/bank/token' },
    ];
    return (
      <div className="create-user-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <TabTable  history={this.props.history} />
      </div>
    );
  }
}
