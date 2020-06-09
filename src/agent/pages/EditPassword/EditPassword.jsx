import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import ChangePasswordForm from './components/ChangePasswordForm';
import IceContainer from '@icedesign/container';

export default class EditPassword extends Component {
  static displayName = 'EditPassword';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '我的主页', link: '' },
      { text: '修改密码', link: '#/profile/list' },
    ];
    return (
      <div className="edit-password-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <IceContainer>
          <ChangePasswordForm history={this.props.history}/>
        </IceContainer>

      </div>
    );
  }
}
