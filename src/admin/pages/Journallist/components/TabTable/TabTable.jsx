import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import CustomTable from './components/CustomTable';
import { Tab } from '@icedesign/base';

const TabPane = Tab.TabPane;

export default class TabTable extends Component {
  static displayName = 'TabTable';

  static propTypes = {};

  static defaultProps = {};
  state = {
    key:'agent'
  };
  handleChange = (key) => {
    this.setState({key})
  };
  render() {
    const {key} = this.state;
    return (
      <div className="tab-table">
        <IceContainer>
          <Tab  onChange={this.handleChange}>
            <TabPane key='agent' tab={_intl.get('journal.agent')}>
              {key==='agent'&&<CustomTable type='agent' />}
            </TabPane>
            <TabPane key='merchant' tab={_intl.get('journal.merchant')}>
              {key==='merchant'&&<CustomTable  type='merchant'/>}
            </TabPane>
          </Tab>
        </IceContainer>
      </div>
    );
  }
}
