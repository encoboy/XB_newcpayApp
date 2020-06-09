import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import CustomTable from './components/Article';


export default class TabTable extends Component {
  static displayName = 'TabTable';

  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <div className="tab-table">
        <IceContainer>
          <CustomTable/>
        </IceContainer>
      </div>
    );
  }
}
