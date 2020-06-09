import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {Tab} from '@icedesign/base';
import CustomTable from './components/CustomTable';


export default class TabTable extends Component {
  static displayName = 'TabTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      activeKey:'',
      currencyData:[],
    }
  }

  //选项卡切换
  handleTabChange = (activeKey) => {
    this.setState({
      activeKey,
    })
  };
  // 获取货币
  getCurrency = () => {
    _fetch({
      url:'/Manager/Merchant',
      data:{
        method:'currency'
      },
      success:(data)=>{
        console.log('currency',data);
        this.setState({
          currencyData:data.data,
          activeKey:data.data[0].id
        })
      }
    })
  }

  componentDidMount(){
      this.getCurrency();
  }

  render() {
    const {activeKey,currencyData} = this.state;
    return (
      <div className="tab-table">
        <IceContainer>
        <Tab activeKey={activeKey} onChange={this.handleTabChange}>
          {currencyData.map((item,index)=>{
            return(
                <Tab.TabPane key={item.id} tab={item.code}>
                      <CustomTable  currencyid={item.id}/>
                </Tab.TabPane>
              )
          })}
        </Tab>
        </IceContainer>
      </div>
    );
  }
}
