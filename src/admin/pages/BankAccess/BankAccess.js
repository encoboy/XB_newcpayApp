

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import TabTable from './components/TabTable';


export default class BankAccess extends Component {
  static displayName = 'BankAccess';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '银行管理', link: '' },
      { text: '银行户口', link: '#/bank/access' },
    ];
    return (
      <div className="create-user-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <TabTable  history={this.props.history} />
      </div>
    );
  }
}
