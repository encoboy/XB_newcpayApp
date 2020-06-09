

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import ChangePgSever from './components/ChangePgSever';


export default class PgSever extends Component {
  static displayName = 'PgSever';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '用户管理', link: '' },
      { text: 'PG服务', link: '#/merchant/pgsever' },
    ];
    return (
      <div className="edit-password-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <ChangePgSever history={this.props.history} />
      </div>
    );
  }
}
