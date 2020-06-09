import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {getUserInfo} from '../../util'
import CustomBreadcrumb from '../../components/CustomBreadcrumb';

class Contact extends Component{
  state = {
    dataSource:[],
    language:{
      'zh-cn':'cn',
      'en-us':'en',
    }
  };
  componentDidMount(){
    this.getData()
  }
  getData = () => {
    _fetch({
      url:'/User/Contact',
      data:{
        method:'',

      },
      success:(data)=>{
        this.setState({
          dataSource:data.data,
        })
      }
    })
  };
  render(){
    const {dataSource,language} = this.state;
    const lang = getUserInfo().lang;
    return(
      <div>
        <CustomBreadcrumb/>
        <IceContainer>
          <div>
            <ul>
              {
                dataSource.map(function (item,index) {
                  return(
                    <li key={index} style={{margin:'15px 0'}}>
                      <strong>{item[`title_${language[lang]}`]}：</strong>
                      {item[`content_${language[lang]}`]}
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </IceContainer>
      </div>
    )
  }
}

export default Contact
