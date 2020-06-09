/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Feedback ,Radio} from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import sha1 from 'sha1';
import './UserForm.scss';
import {connect} from 'react-redux';
import {hasAction} from '../../../../util';

const { Group: RadioGroup } = Radio;
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

      },
    };
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };
  componentDidMount(){
    // console.log(this.props);
  }
  validateAllFormField = () => {
    
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        return;
      }
      // values.password=sha1(values.username.toLowerCase()+values.password);
      _fetch({
        url:'/Merchant/User',
        data:{
          method:'adduser',
          ...values,
          username:values.username.toLowerCase(),
          password:sha1(values.username.toLowerCase()+values.password)
        },
        success:()=>{
          this.setState({value:{}});
          Toast.success(_intl.get('usercard.tip'));
          this.props.history.push('/merchant/list')
        }
      });

    });
  };

  render() {
    const {btn} = this.props;
    // console.log(hasAction(btn,'User_adduser'));
    return (
      <div className="user-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>{/*_intl.get('public.user_adduser')*/}</h2>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('public.username')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder
                    name="username"
                    rules={[
                      {required:true,message:_intl.get('public.required')},
                      {min:3,max:10,message:_intl.get('password.max')}
                    ]}
                  >
                    <Input size="large"  placeholder={_intl.get('password.max')} style={{width:'100%'}}/>
                  </IceFormBinder>
                  <IceFormError name="username"  />
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
                    <Input size="large" htmlType='password' placeholder={_intl.get('password.pwdmax')} style={{width:'100%'}}/>
                  </IceFormBinder>
                  <IceFormError name="password" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('public.nickname')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="nickname"   required message= {_intl.get('public.required')}>
                    <Input
                      size="large"
                      style={{width:'100%'}}
                    />
                  </IceFormBinder>
                  <IceFormError name="nickname" />
                </Col>
              </Row>
              {/*<Row style={styles.formItem}>*/}
                {/*<Col xxs="6" s="4" l="3" style={styles.formLabel}>*/}
                  {/*{_intl.get('merchantlist.country')}：*/}
                {/*</Col>*/}
                {/*<Col xxs="16" s="12" l="10">*/}
                  {/*<IceFormBinder name="country"   required message= {_intl.get('public.required')}>*/}
                    {/*<Input*/}
                      {/*size="large"*/}
                      {/*style={{width:'100%'}}*/}
                    {/*/>*/}
                  {/*</IceFormBinder>*/}
                  {/*<IceFormError name="country" />*/}
                {/*</Col>*/}
              {/*</Row>*/}
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('public.phone')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="mobile"   required message= {_intl.get('public.required')}>
                    <Input
                      size="large"
                      style={{width:'100%'}}
                    />
                  </IceFormBinder>
                  <IceFormError name="mobile" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('public.email')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="email"   required message= {_intl.get('public.required')}>
                    <Input
                      size="large"
                      style={{width:'100%'}}
                    />
                  </IceFormBinder>
                  <IceFormError name="email" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('public.is_lang')}：
                </Col>
                <Col xxs="16" s="12" l="10" style={{lineHeight:'32px'}}>
                  <IceFormBinder name="lang"   required message= {_intl.get('public.required')}>
                    <RadioGroup dataSource={[{value:'zh-CN',label:"中文"},{value:'en-US',label:"English"}]} />
                  </IceFormBinder>
                  <IceFormError name="lang" />
                </Col>
              </Row>
            </div>
          </IceFormBinderWrapper>

          <Row style={{ marginTop: 20 }}>
            <Col offset="3">
              {hasAction(btn,'User_adduser')&&<Button
                size="large"
                type="primary"
                onClick={this.validateAllFormField}
              >
                {_intl.get('public.submit')}
              </Button>}
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    btn:state.operation.btn,
    language:state.language
  }
}
export default connect(mapStateToProps)(UserForm);

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
