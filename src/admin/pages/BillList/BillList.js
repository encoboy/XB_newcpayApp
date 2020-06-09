import React, { Component } from 'react';
import ComplexTabTable from './components/ComplexTabTable';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';

export default class Robot extends Component {
  static displayName = 'Robot';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '机器人管理', link: '' },
      { text: '机器人列表', link: '#/robot/list' },
    ];
    return (
      <div className="usercards-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <ComplexTabTable/>
      </div>
    );
  }
}
