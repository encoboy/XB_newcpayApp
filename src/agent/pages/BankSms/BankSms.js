

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import TabTable from './components/TabTable';


export default class BankSms extends Component {
  static displayName = 'BankSms';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '银行管理', link: '' },
      { text: '银行短信', link: '#/bank/sms' },
    ];
    return (
      <div className="create-user-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <TabTable  history={this.props.history} />
      </div>
    );
  }
}
