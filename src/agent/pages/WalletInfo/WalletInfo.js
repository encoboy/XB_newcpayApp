import React, { Component } from 'react';
import Info from './components/Info';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';

export default class WalletInfo extends Component {
  static displayName = 'WalletInfo';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '我的钱包', link: '' },
      { text: '基本资料', link: '#/wallet/info' },
    ];
    return (
      <div className="verify-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <Info />
      </div>
    );
  }
}
