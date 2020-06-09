/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Feedback } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import sha1 from 'sha1'
import {getUserInfo} from '../../../../util'
import './UserForm.scss';

const { Row, Col } = Grid;
const Toast = Feedback.toast;
export default class UserForm extends Component {
  static displayName = 'UserForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        username: '',
        password: '',
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
      console.log(getUserInfo().username)
      if (errors) {
        return;
      }
      _fetch({
        url:'/User/Userlogin',
        data:{
          method:'addsub',
          username:values.username.toLowerCase(),
          password:sha1(getUserInfo().username.toLowerCase()+values.username+values.password)
        },
        success:()=>{
          Toast.success(_intl.get('usercard.tip'));
          this.setState({
            value:{
              username: '',
              password: '',
            }
          })
          this.props.history.push('/sub/userlogin')
        }
      });

    });
  };
  render() {
    return (
      <div className="user-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>{/*_intl.get('sider.account_addaccount')*/}</h2>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('public.username')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder
                    name="username"
                    required
                    rules={[
                      {required:true,message:_intl.get('public.required')},
                      {min:3,max:20,message:_intl.get('password.max')}
                    ]}
                  >
                    <Input size="large"  placeholder={_intl.get('password.max')} style={{width:'100%'}} />
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
                    <Input size="large" htmlType='password' placeholder={_intl.get('password.pwdmax')}    style={{width:'100%'}} />
                  </IceFormBinder>
                  <IceFormError name="password" />
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
