import React, { Component } from 'react';
import ComplexTabTable from './components/ComplexTabTable';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';

export default class inoutdailylist extends Component {
  static displayName = 'inoutdailylist';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '每日账单', link: '' },
      { text: '每日账单', link: '#/inoutdailylist/list' },
    ];
    return (
      <div className="usercards-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <ComplexTabTable/>
      </div>
    );
  }
}
