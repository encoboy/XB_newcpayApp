import React, { Component } from 'react';
import DetailTable from './components/DetailTable';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import './todaybill-page.scss'

export default class TodayBill extends Component {
  static displayName = 'TodayBill';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '我的账单', link: '' },
      { text: '今日账单', link: '#/bill/today' },
    ];
    return (
      <div className="todaybill-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <DetailTable/>
      </div>
    );
  }
}
