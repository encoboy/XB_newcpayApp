/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Form,Input, Grid,Tab, Button,Field, Feedback,Select,Card,Table,Dropdown, Menu  } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import sha1 from 'sha1'
import {getUserInfo,hasAction} from '../../../../util'
import {connect} from 'react-redux';
import './JurisdictionGroup.scss';
import DisplayPageAll from './../DisplayPageAll/index';
import DisplayBtnAll from './../DisplayBtnAll/index';

const { Row, Col } = Grid;
const Toast = Feedback.toast;
const FormItem = Form.Item;
const { Combobox } = Select;

 class JurisdictionGroup extends Component {
  static displayName = 'JurisdictionGroup';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      pageoperategroups:[],
      buttonoperategroups:[],
      activeKey:'page',
      currencyData:[],
      pageoperate:[],
      btnoperation:[]
    };
    this.field = new Field(this);
  }

  // 获取所有的页面权限
  getPageData=()=>{
    _fetch({
      url:'/Merchant/Operations',
      data:{
        method:'getoperations'
      },
      success:(data)=>{
        console.log('getoperations所有页面权限',data)
        this.setState({
          pageoperate:data.data
        })
      }
    })
  };

  //获取所有的页面权限分组
  getPageOprationGrops=()=>{
    _fetch({
      url:'/Merchant/Operations',
      data:{
        method:'getoperationsroups'
      },
      success:(data)=>{
        console.log('getoperationsroups页面分组权限',data);
        this.setState({
          pageoperategroups:data.data
        })
      }
    })
  };

  // 获取所有的操作权限
  getBtnData = () => {
    _fetch({
      url:'/Merchant/Operations',
      data:{
        method:'getoperates',
      },
      success:(data)=>{
        console.log('getoperations所有操作权限',data);
        this.setState({
        btnoperation:data.data
        })
      }
    })
  };

  // 获取所有的操作权限分组
  getButtonOperationGroups = () => {
    _fetch({
      url:'/Merchant/Operations',
      data:{
        method:'getoperategroups'
      },
      success:(data)=>{
        console.log('getoperategroups操作分组权限',data);
        this.setState({
          buttonoperategroups:data.data
        })
      }
    })
  }
  componentDidMount(){
    this.getPageOprationGrops();
    this.getButtonOperationGroups();
    this.getPageData();
    this.getBtnData();
  }

  //选项卡切换
  handleTabChange = (activeKey) => {
    this.setState({
      activeKey,
    })
  };
  
  render() {
    const init = this.field.init;
    const {pageoperategroups,buttonoperategroups,pageoperate,btnoperation} = this.state;
    let _that = this;
    const {activeKey} = this.state;
    return (
        <div className="tab-table">
          <IceContainer>
            <Tab activeKey={activeKey} onChange={this.handleTabChange}>
                    <Tab.TabPane key="page" tab={_intl.get('userJurisdiction.pageRight')}>
                          <DisplayPageAll 
                            pageoperategroups={pageoperategroups} 
                            getPageOprationGrops={this.getPageOprationGrops}
                            pageoperate={pageoperate}
                          />
                    </Tab.TabPane>
                    <Tab.TabPane key="btn" tab={_intl.get('userJurisdiction.operationRight')}>
                          <DisplayBtnAll
                            buttonoperategroups={buttonoperategroups} 
                            getButtonOperationGroups={this.getButtonOperationGroups}
                            btnoperation={btnoperation}
                          />
                    </Tab.TabPane>
              </Tab>
          </IceContainer>
        </div>
        )
  }
}

const mapStateToProps = (state) => {
  return {
    language:state.language,
    btn:state.operation.btn
  }
};

export default connect(mapStateToProps)(JurisdictionGroup)

const styles = {
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formItem: {
    marginBottom: 25,
  },
  formLabel: {
    height: '32px',
    lineHeight: '32px',
    textAlign: 'right',
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
  groupName:{
    fontSize:'15px',
    fontWeight:'600',
    marginRight:'15px'
  },
  operationItem:{
    width:'450px',
    border:'1px solid lightgray',
    padding:'5px'
  },
  childrenOperation:{
    marginTop:'5px'
  }
};
