import React, { Component } from 'react';
import TabTable from './components/TabTable';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';

export default class UserCards extends Component {
  static displayName = 'UserCards';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="usercards-page">
        <CustomBreadcrumb />
        <TabTable />
      </div>
    );
  }
}
