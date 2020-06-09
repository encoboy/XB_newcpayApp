import React, { Component } from 'react';
import ComplexTabTable from './components/ComplexTabTable';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';

export default class Ordererror extends Component {
  static displayName = 'Ordererror';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '订单管理', link: '' },
      { text: '订单列表', link: '#/order/Ordererror' },
    ];
    return (
      <div className="usercards-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <ComplexTabTable/>
      </div>
    );
  }
}
