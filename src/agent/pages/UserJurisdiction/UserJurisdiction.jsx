
import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';

import JurisdictionGroup from './components/JurisdictionGroup';


export default class UserJurisdiction extends Component {
  static displayName = 'UserJurisdiction';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '子账号', link: '' },
      { text: '权限分组', link: '#/sub/userjurisdiction' },
    ];
    return (
      <div className="edit-password-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <JurisdictionGroup history={this.props.history} />
      </div>
    );
  }
}
