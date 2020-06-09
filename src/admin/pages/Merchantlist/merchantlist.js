import React, { Component } from 'react';
import TabTable from './components/TabTable';
import Unchecked from './components/Unchecked';
import { Tab } from '@icedesign/base';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import IceContainer from '@icedesign/container';

const TabPane = Tab.TabPane;

export default class Merchantlist extends Component {
  static displayName = 'Merchantlist';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '商家管理', link: '' },
      { text: '商家列表', link: '#/agent/list' },
    ];
    return (
      <div className="usercards-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <IceContainer>
          {/*<Tab>*/}
            {/*<TabPane key='all' tab={_intl.get('merchantlist.all')} >*/}
              {/*<TabTable />*/}
            {/*</TabPane>*/}
            {/*<TabPane key='no' tab={_intl.get('merchantlist.no')} >*/}
              {/*<Unchecked />*/}
            {/*</TabPane>*/}
          {/*</Tab>*/}
          <TabTable />
        </IceContainer>

      </div>
    );
  }
}
