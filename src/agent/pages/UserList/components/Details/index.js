import React, { Component } from 'react';
import {Tab,Button} from '@icedesign/base';
import Info from './components/info/Info'
import Bankcard from './components/bankcard/bankcard'
import Config from './components/config/config'
import Bill from './components/bill/bill';
import BrandDesign from './components/BrandDesign/BrandDesign';

const TabPane = Tab.TabPane;

export default class DetailsUser extends Component{
  render(){
    const {id,username} = this.props;
    return(
      <Tab size='small' type="text" tabBarExtraContent={<Button type='normal' shape='text' onClick={this.props.goBack}>{_intl.get('public.back')}</Button>} >
        <TabPane key={1} tab={_intl.get('public.info')}>
          <Info id={id} username={username}/>
        </TabPane>
        <TabPane key={3} tab={_intl.get('public.config')}>
          <Config id={id}/>
        </TabPane>
        <TabPane key={2} tab={_intl.get('public.card')}>
          <Bankcard id={id}/>
        </TabPane>
        {/*<TabPane key={4} tab={_intl.get('BrandDesign.Brand')}>
          <BrandDesign id={id}/>
      　</TabPane>*/}
      </Tab>
    )
  }
}
