

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
    return (
      <div className="edit-password-page">
        <CustomBreadcrumb />
        <ChangePasswordForm />
      </div>
    );
  }
}
