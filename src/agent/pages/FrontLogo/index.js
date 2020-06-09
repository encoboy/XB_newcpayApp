import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import FrontLogo from './FrontLogo';

export default class Index extends Component {
  static displayName = 'FrontLogo';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '我的资料', link: '' },
      { text: '前端logo', link: '#/profile/frontlogo' },
    ];
    return (
      <div> 
        <CustomBreadcrumb dataSource={breadcrumb} />
        <FrontLogo/>
      </div>
    );
  }
}