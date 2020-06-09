import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import ChangePasswordForm from './components/ChangePasswordForm';
import Transpass from './components/Transpass';
import { Tab } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import './EditPassword.scss';

const TabPane = Tab.TabPane;

export default class EditPassword extends Component {
  static displayName = 'EditPassword';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '用户管理', link: '' },
      { text: '修改密码', link: '#/merchant/list' },
    ];
    return (
      <div className="edit-password-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <IceContainer>
          <Tab>
            <TabPane key='login' tab={_intl.get('password.login')}>
              <ChangePasswordForm history={this.props.history}/>
            </TabPane>
            <TabPane key='tranpass'  tab={_intl.get('password.tranpass')}>
              <Transpass history={this.props.history}/>
            </TabPane>
          </Tab>
        </IceContainer>
      </div>
    );
  }
}
