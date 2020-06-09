import React, { Component } from 'react';
import TabTable from './components/TabTable';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';

export default class MonthlyBill extends Component {
  static displayName = 'MonthlyBill';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '我的账单', link: '' },
      { text: '每月账单', link: '#/bill/monthly' },
    ];
    return (
      <div className="usercards-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <TabTable/>
      </div>
    );
  }
}
