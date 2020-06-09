

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import UserForm from './components/UserForm';

// import './CreateUser.scss';

export default class CreateUser extends Component {
  static displayName = 'CreateUser';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '机器人管理', link: '' },
      { text: '添加机器人', link: '#/robot/create' },
    ];
    return (
      <div className="create-user-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <UserForm  history={this.props.history} />
      </div>
    );
  }
}
