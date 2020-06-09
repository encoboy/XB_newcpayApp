import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import IceContainer from '@icedesign/container';
import TabTable from './component/Table';


export default class Reason extends Component {
  static displayName = 'BankSms';

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="create-user-page">
        <CustomBreadcrumb  />
        <IceContainer>
          <TabTable  history={this.props.history} />
        </IceContainer>
      </div>
    );
  }
}
