/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Feedback ,Radio,Select} from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import sha1 from 'sha1';
import {connect} from 'react-redux'
import {hasAction} from '../../../../util'
import './UserForm.scss';

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
      currencyData:[]
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
      // values.password=sha1(values.username.toLowerCase()+values.password);
      _fetch({
        url:'/Manager/Merchant',
        data:{
          method:'addmerchant',
          ...values,
          username:values.username.toLowerCase(),
          password:sha1(values.username.toLowerCase()+values.password)
        },
        success:()=>{
          this.setState({value:{}});
          Toast.success(_intl.get('usercard.tip'));
          this.props.history.push('/agent/list')
        }
      });

    });
  };

  // 获取货币
  getCurrency = () => {
    _fetch({
      url:'/Manager/Merchant',
      data:{
        method:'currency'
      },
      success:(data)=>{
        console.log('currency',data),
        this.setState({
          currencyData:data.data
        })
      }
    })
  }

  componentDidMount(){
    this.getCurrency();
  }
  render() {
    const {btn} = this.props;
    const {currencyData} = this.state;
    return (
      <div className="user-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>{/*_intl.get('sider.merchant_add')*/}</h2>

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
                    <Input size="large"  placeholder={_intl.get('password.max')}  style={{width:'100%'}}/>
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
                    <Input size="large" htmlType='password'  placeholder={_intl.get('password.pwdmax')} style={{width:'100%'}}/>
                  </IceFormBinder>
                  <IceFormError name="password" />
                </Col>
              </Row>
              {/*<Row style={styles.formItem}>*/}
                {/*<Col xxs="6" s="4" l="3" style={styles.formLabel}>*/}
                  {/*{_intl.get('merchantlist.tranpass')}：*/}
                {/*</Col>*/}
                {/*<Col xxs="16" s="12" l="10">*/}
                  {/*<IceFormBinder name="tranpass"   required message= {_intl.get('public.required')}>*/}
                    {/*<Input*/}
                      {/*size="large"*/}
                      {/*style={{width:'100%'}}*/}
                    {/*/>*/}
                  {/*</IceFormBinder>*/}
                  {/*<IceFormError name="mobile" />*/}
                {/*</Col>*/}
              {/*</Row>*/}
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('merchantlist.nickname')}：
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
                  {_intl.get('merchantlist.phone')}：
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
                  {_intl.get('merchantlist.email')}：
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
                  {_intl.get('merchantlist.currency')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="currency"   required message= {_intl.get('public.required')}>
                  <Select style={{width:'100%'}} placeholder={_intl.get('merchantlist.currencytype')}>
                    {currencyData&&currencyData.map((item,index)=>{
                      return (
                        <Select.Option value={item.id} key={index}>{item.code}</Select.Option>
                      )
                    })}
                  </Select>
                  </IceFormBinder>
                  <IceFormError name="currency" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('merchantlist.lang')}：
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

          {
            hasAction(btn,'Merchant_addmerchant')&&
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
        </IceContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language:state.language,
    btn:state.operation.btn
  }
};


export default connect(mapStateToProps)(UserForm)

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
