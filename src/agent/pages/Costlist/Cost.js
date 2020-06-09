import React, { Component } from 'react';
import TabTable from './components/TabTable';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';

export default class Costlist extends Component {
  static displayName = 'Costlist';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '费用管理', link: '' },
      { text: '费用列表', link: '#/finance/Costlist' },
    ];
    return (
      <div className="usercards-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <TabTable history={this.props.history}/>
      </div>
    );
  }
}
