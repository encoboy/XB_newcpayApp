import React, { Component } from 'react';
import TabTable from './components/TabTable';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';

export default class UserCards extends Component {
  static displayName = 'UserCards';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '财务管理', link: '' },
      { text: '流水列表', link: '#/finance/journal' },
    ];
    return (
      <div className="usercards-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <TabTable />
      </div>
    );
  }
}
