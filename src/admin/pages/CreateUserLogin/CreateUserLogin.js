
import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import UserForm from './components/UserForm';



export default class CreateUserLogin extends Component {
  static displayName = 'CreateUserLogin';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '用户管理', link: '' },
      { text: '添加子账号', link: '#/sub/adduserlogin' },
    ];
    return (
      <div className="create-user-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <UserForm history={this.props.history} />
      </div>
    );
  }
}
