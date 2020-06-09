import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import {asideMenuConfig as menu} from '../../menuConfig'

export default class CustomBreadcrumb extends Component {
  static displayName = 'CustomBreadcrumb';

  static defaultProps = {
    dataSource: [],
  };

  static propTypes = {
    dataSource: PropTypes.array,
  };
  state = {
    dataSource:[]
  };
  componentDidMount(){
    const path = location.hash.slice(1).trim();
    const f = menu.filter(function (item) {
      return path.indexOf(item.path.trim())>-1
    })[0];
    const c = f.children.length>0&&f.children.filter(function (item) {
      return item.path.indexOf(path.trim())>-1
    })[0];
    this.setState({
      dataSource:[
        {text:f.name,link:`#${f.path}`},
        {text:c.name,link:`#${c.path}`},
      ]
    })
  }
  render() {
    const { dataSource } = this.state;
    return (
      <IceContainer>
        <Breadcrumb style={{ margin: 0 }}>
          {dataSource.map((item, index) => {
            return (
              <Breadcrumb.Item link={item.link} key={index}>
                {item.text&&item.text()}
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </IceContainer>
    );
  }
}
