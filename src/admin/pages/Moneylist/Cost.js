import React, { Component } from 'react';
import TabTable from './components/TabTable';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';

export default class Moneylist extends Component {
  static displayName = 'Moneylist';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '费用管理', link: '' },
      { text: '费用列表', link: '#/finance/Moneylist' },
    ];
    return (
      <div className="usercards-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <TabTable history={this.props.history}/>
      </div>
    );
  }
}
