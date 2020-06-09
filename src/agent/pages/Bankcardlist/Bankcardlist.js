import React, { Component } from 'react';
import TabTable from './components/TabTable';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import IceContainer from '@icedesign/container';


export default class Bankcardlist extends Component {
  static displayName = 'Bankcardlist';

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="usercards-page">
        <CustomBreadcrumb  />
        <IceContainer>
          <TabTable/>
        </IceContainer>
      </div>
    );
  }
}
