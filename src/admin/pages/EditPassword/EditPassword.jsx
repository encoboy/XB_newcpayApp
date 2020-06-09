

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import ChangePasswordForm from './components/ChangePasswordForm';


export default class EditPassword extends Component {
  static displayName = 'EditPassword';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '用户管理', link: '' },
      { text: '修改密码', link: '#/merchant/list' },
    ];
    return (
      <div className="edit-password-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <ChangePasswordForm history={this.props.history} />
      </div>
    );
  }
}
