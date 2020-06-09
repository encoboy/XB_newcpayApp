/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Input, Grid, Button, Feedback } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import {hasAction} from '../../../../util'
import {connect} from 'react-redux'
// import './ChangePasswordForm.scss';

const { Row, Col } = Grid;
const Toast = Feedback.toast;

 class ChangePasswordForm extends Component {
  static displayName = 'ChangePasswordForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      hastranpass:false,
      value: {
        new_pass: '',
        old_pass: '',
        rePasswd: '',
      },
    };
  }
   componentDidMount(){
     this.getInfo();
   }
   getInfo = () => {
     _fetch({
       url:'/User/Profile',
       data:{
         method:'userinfo'
       },
       success:(data)=>{
         this.setState({
           hastranpass:!!(data.data.hastranpass||data.data.tranpass)
         })
       }
     })
   };
  checkPasswd = (rule, values, callback) => {
    if (!values) {
      callback(_intl.get('public.required'));
    } else {
      callback();
    }
    // else if (values.length < 8) {
    //     callback('密码必须大于8位');
    //   } else if (values.length > 16) {
    //     callback('密码必须小于16位');
    //   }
  };

  checkPasswd2 = (rule, values, callback, stateValues) => {
    if (values && values !== stateValues.new_pass) {
      callback(_intl.get('password.no'));
    } else if(!values) {
      callback(_intl.get('public.required'));
    }else {
      callback();
    }
  };

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
        url:'/User/Profile',
        data:{
          method:'updateinfo',
          type:'tran',
          ...values
        },
        success:()=>{
          Toast.success(_intl.get('public.success'));
          // this.props.history.push('/login')
        }
      });
    });
  };

  render() {
    const {btn} = this.props;
    const {hastranpass} = this.state;
    return (
      <div className="change-password-form">
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div style={styles.formContent}>
            {/*<h2 style={styles.formTitle}>{_intl.get('sider.password')}</h2>*/}
            {
              (!hastranpass)&&
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('password.newtranpass')}：
                </Col>
                <Col xxs="16" s="10" l="6">
                  <IceFormBinder
                    name="new_pass"
                    rules={[
                      {
                        required: true,
                        message:_intl.get('public.required')
                      },
                      {
                        min:6,
                        max:12,
                        message:_intl.get('password.min')
                      }
                    ]}
                  >
                    <Input
                      htmlType="password"
                      size="large"
                      // placeholder="两次输入密码保持一致"
                    />
                  </IceFormBinder>
                  <p style={{color:'#999'}}>{_intl.get('password.first')}</p>
                  <IceFormError name="new_pass" />
                </Col>
              </Row>
            }
            {
              hastranpass&&
                <div>
                  <Row style={styles.formItem}>
                    <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                      {_intl.get('password.oldtranpass')}：
                    </Col>
                    <Col xxs="16" s="10" l="6">
                      <IceFormBinder
                        name="old_pass"
                        rules={[
                          {
                            required: true,
                            message:_intl.get('public.required')
                          },
                          {
                            min:6,
                            max:12,
                            message:_intl.get('password.min')
                          }
                        ]}
                      >
                        <Input
                          htmlType="password"
                          size="large"
                          // placeholder="请重新输入新密码"
                        />
                      </IceFormBinder>
                      <IceFormError name="old_pass" />
                    </Col>
                  </Row>
                  <Row style={styles.formItem}>
                    <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                      {_intl.get('password.newtranpass')}：
                    </Col>
                    <Col xxs="16" s="10" l="6">
                      <IceFormBinder
                        name="new_pass"
                        rules={[
                          {
                            required: true,
                            message:_intl.get('public.required')
                          },
                          {
                            min:6,
                            max:12,
                            message:_intl.get('password.min')
                          }
                        ]}
                      >
                        <Input
                          htmlType="password"
                          size="large"
                          // placeholder="两次输入密码保持一致"
                        />
                      </IceFormBinder>
                      <IceFormError name="new_pass" />
                    </Col>
                  </Row>
                  <Row style={styles.formItem}>
                    <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                      {_intl.get('password.confirmtranpass')}：
                    </Col>
                    <Col xxs="16" s="10" l="6">
                      <IceFormBinder
                        name="rePasswd"
                        required
                        validator={(rule, values, callback) =>
                          this.checkPasswd2(
                            rule,
                            values,
                            callback,
                            this.state.value
                          )
                        }
                      >
                        <Input
                          htmlType="password"
                          size="large"
                          // placeholder="两次输入密码保持一致"
                        />
                      </IceFormBinder>
                      <IceFormError name="rePasswd" />
                    </Col>
                  </Row>
                </div>
            }

          </div>
        </IceFormBinderWrapper>
        {
          hasAction(btn,'UPdateinfo_tran')&&
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
        }
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

function mapStateToProps(state){
  return {
    btn: state.operation.btn,
    language:state.language,
  }
}

export default connect(mapStateToProps)(ChangePasswordForm)
