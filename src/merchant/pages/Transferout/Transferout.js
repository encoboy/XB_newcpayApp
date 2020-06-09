

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import ChangePasswordForm from './components/ChangePasswordForm';

// import './EditPassword.scss';

export default class Transferout extends Component {
  static displayName = 'Transferout';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '我的钱包', link: '' },
      { text: '添加转账', link: '#/wallet/transferout' },
    ];
    return (
      <div className="edit-password-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <ChangePasswordForm />
      </div>
    );
  }
}
