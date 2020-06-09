import React, { Component } from 'react';
import DetailTable from './components/DetailTable';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import './Userinfo.scss'

export default class Userinfo extends Component {
  static displayName = 'Userinfo';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '用户管理', link: '' },
      { text: '我的主页', link: '#/merchant/info' },
    ];
    return (
      <div className="userinfo-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <DetailTable />
      </div>
    );
  }
}
