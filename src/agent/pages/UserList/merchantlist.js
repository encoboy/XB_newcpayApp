import React, { Component } from 'react';
import TabTable from './components/TabTable';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import IceContainer from '@icedesign/container';


export default class Merchantlist extends Component {
  static displayName = 'Merchantlist';

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
