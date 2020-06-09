/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Input, Grid, Button, Feedback } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import sha1 from 'sha1'
// import {getUserInfo} from '../../../../util'
// import './ChangePasswordForm.scss';
import {hasAction} from '../../../../util';
import {connect} from 'react-redux';

const { Row, Col } = Grid;
const Toast = Feedback.toast;

class ChangePasswordForm extends Component {
  static displayName = 'ChangePasswordForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        new_pass: '',
        old_pass: '',
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
        url:'/Merchant/Profile',
        data:{
          method:'updateinfo',
          type:'tpw',
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
    return (
      <div className="change-password-form">
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div style={styles.formContent}>
            {/*<h2 style={styles.formTitle}>{_intl.get('sider.password')}</h2>*/}

            <Row style={styles.formItem}>
              <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                {_intl.get('password.tranpass')}：
              </Col>
              <Col xxs="16" s="10" l="6">
                <IceFormBinder
                  name="old_pass"
                  // required
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
                  required
                  message={_intl.get('public.required')}
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
      </div>
    );
  }
}
const mapStateToProp = (state) => {
  return{
    btn:state.operation.btn,
    language:state.language
  }
}


export default connect(mapStateToProp)(ChangePasswordForm);

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
