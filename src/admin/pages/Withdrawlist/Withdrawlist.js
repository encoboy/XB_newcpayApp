import React, { Component } from 'react';
import TabTable from './components/TabTable';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';

export default class Withdrawlist extends Component {
  static displayName = 'Withdrawlist';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '财务管理', link: '' },
      { text: '提现列表', link: '#/finance/withdrawlist' },
    ];
    return (
      <div className="usercards-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <TabTable />
      </div>
    );
  }
}
