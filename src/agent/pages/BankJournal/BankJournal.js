

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import TabTable from './components/TabTable';


export default class BankJournal extends Component {
  static displayName = 'BankJournal';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '银行管理', link: '' },
      { text: '银行流水', link: '#/bank/journal' },
    ];
    // console.log(breadcrumb);
    return (
      <div className="create-user-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <TabTable  history={this.props.history} />
      </div>
    );
  }
}
