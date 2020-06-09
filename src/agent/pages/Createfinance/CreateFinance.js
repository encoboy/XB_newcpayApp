import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import UserForm from './components/UserForm';
export default class CreateUser extends Component {
  static displayName = 'CreateFinance';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '财务管理', link: '' },
      { text: '添加财务', link: '#/merchant/CreateFinance' },
    ];
    return (
      <div className="create-user-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <UserForm  history={this.props.history} />
      </div>
    );
  }
}