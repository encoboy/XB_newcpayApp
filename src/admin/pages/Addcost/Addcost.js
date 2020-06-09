import React, { Component } from 'react';
import Addrunwater from './component/Addrunwater/Addrunwter';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';

export default class Addcost extends Component {
  static displayName = 'Addcost';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '添加管理', link: '' },
      { text: '添加费用', link: '#/finance/Addcost' },
    ];
    return (
      <div className="usercards-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <Addrunwater history={this.props.history}/>
      </div>
    );
  }
}