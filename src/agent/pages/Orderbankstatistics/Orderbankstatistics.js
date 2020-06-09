import React, { Component } from 'react';
import ComplexTabTable from './components/ComplexTabTable/ComplexTabTable';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';

export default class Orderbankstatistics extends Component {
  static displayName = 'Orderbankstatistics';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '订单详情', link: '' },
      { text: '银行统计', link: '#/order/Orderbankstatistics' },
    ];
    return (
      <div className="usercards-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <ComplexTabTable/>
      </div>
    );
  }
}