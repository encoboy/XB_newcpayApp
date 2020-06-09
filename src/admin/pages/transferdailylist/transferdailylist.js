import React, { Component } from 'react';
import ComplexTabTable from './components/ComplexTabTable';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';

export default class transferdailylist extends Component {
  static displayName = 'transferdailylist';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '每日账单', link: '' },
      { text: '每日账单', link: '#/transferdailylist/list' },
    ];
    return (
      <div className="usercards-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <ComplexTabTable/>
      </div>
    );
  }
}
