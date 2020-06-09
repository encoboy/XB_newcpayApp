

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import UserForm from './components/UserForm';


export default class CreatePG extends Component {
  static displayName = 'CreatePG';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: 'PG管理', link: '' },
      { text: '添加PG', link: '#/PG/create' },
    ];
    return (
      <div className="create-user-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <UserForm  history={this.props.history} />
      </div>
    );
  }
}
