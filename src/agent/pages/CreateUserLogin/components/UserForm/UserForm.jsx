/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Feedback,Select } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import sha1 from 'sha1'
import {getUserInfo,hasAction} from '../../../../util'
import './UserForm.scss';
import {connect} from 'react-redux';

const { Row, Col } = Grid;
const Toast = Feedback.toast;
class UserForm extends Component {
  static displayName = 'UserForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        username: '',
        password: '',
        pageoperategroups:[],
        buttonoperategroups:[]
      },
    };
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        return;
      }
      _fetch({
        url:'/Merchant/Merchantlogin',
        data:{
          method:'addsub',
          username:values.username.toLowerCase(),
          password:sha1(getUserInfo().username.toLowerCase()+values.username.toLowerCase()+values.password),
          operation:values.operation?values.operation.join('|'):undefined,
          operate:values.operate?values.operate.join('|'):undefined
        },
        success:()=>{
          Toast.success(_intl.get('usercard.tip'));
          this.setState({
            value:{
              username: '',
              password: '',
  
            }
          });
          this.props.history.push('/sub/list');
        }
      });

    });
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
  }
  render() {
    const {btn} = this.props;
        const {pageoperategroups,buttonoperategroups} = this.state;
    // 构造选择的页面权限数组
    let pageDataSource = [];
    if(pageoperategroups){for(let i = 0;i<pageoperategroups.length;i++){
      pageDataSource.push({value:pageoperategroups[i].id,label:pageoperategroups[i].name});
    }}
    // 构造选择的操作权限数组
    let btnDataSource = [];
    if(buttonoperategroups){for(let j= 0;j<buttonoperategroups.length;j++){
      btnDataSource.push({value:buttonoperategroups[j].id,label:buttonoperategroups[j].name});
    }}
    return (
      <div className="user-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>{_intl.get('sider.sub_add')}</h2>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('public.username')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder
                    name="username"
                    rules={[
                      {required:true,message:_intl.get('public.required')},
                      {min:3,max:20,message:_intl.get('password.max')}
                    ]}
                  >
                    <Input size="large"  style={{width:'100%'}} placeholder={_intl.get('password.max')} />
                  </IceFormBinder>
                  <IceFormError name="username" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('public.password')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder
                    name="password"
                    rules={[
                      {required:true,message:_intl.get('public.required')},
                      {min:5,max:15,message:_intl.get('password.pwdmax')}
                    ]}
                  >
                    <Input size="large" htmlType='password' placeholder={_intl.get('password.pwdmax')}  style={{width:'100%'}} />
                  </IceFormBinder>
                  <IceFormError name="password" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
              <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                {_intl.get('userJurisdiction.pageRight')}：
              </Col>
              <Col xxs="16" s="12" l="10">
                <IceFormBinder
                  name="operation"
                  // rules={[
                  //   {required:true,message:_intl.get('public.required')}
                  // ]}
                >
                  <Select multiple dataSource={pageDataSource}   onChange={this.handleChange}  style={{width: '100%'}} />
                </IceFormBinder>
                <IceFormError name="operations" />
              </Col>
            </Row>

            <Row style={styles.formItem}>
              <Col xxs="6" s="4" l="3" style={styles.formLabel}>
              {_intl.get('userJurisdiction.operationRight')}：
              </Col>
              <Col xxs="16" s="12" l="10">
                <IceFormBinder
                  name="operate"
                  // rules={[
                  //   {required:true,message:_intl.get('public.required')}
                  // ]}
                >
                  <Select multiple dataSource={btnDataSource}   onChange={this.handleChange} style={{width: '100%'}} />
                </IceFormBinder>
                <IceFormError name="operate" />
              </Col>
            </Row>
            </div>
          </IceFormBinderWrapper>

          <Row style={{ marginTop: 20 }}>
            <Col offset="3">
              <Button
                size="large"
                type="primary"
                onClick={this.validateAllFormField}
              >
                {_intl.get('public.submit')}
              </Button>
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}
const mapStatToProp = (state) => {
  return{
    btn:state.operation.btn,
    language:state.language
  }
}


export default connect(mapStatToProp)(UserForm)

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
};
