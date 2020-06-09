/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Feedback ,Radio} from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import './Addrunwater.scss';

const { Group: RadioGroup } = Radio;
const { Row, Col } = Grid;
const Toast = Feedback.toast;

 class Addrunwater extends Component {
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

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        return;
      }
      console.log(values);
      _fetch({
        url:'/Merchant/MerchantWalletTrx',
        data:{
          method:'addwallettrx',
          ...values
        },
        success:(data)=>{
            console.log(data);
          this.setState({value:{}});
        }
      });

    });
  };

  render() {
    const {btn} = this.props;
    return (
      <div className="user-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>
                {_intl.get('wallet.addrunwater')}
                <Button style={styles.buttonfloat} shape="text" onClick={this.props.goBack}>返回</Button>
              </h2>
              
              {/*<Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('wallet.openbal')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder
                    name="openbal"
                    rules={[
                    ]}
                  >
                    <Input size="large"  style={{width:'100%'}}/>
                  </IceFormBinder>
                  <IceFormError name="openbal" />
                </Col>
                  </Row>*/}

              
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('wallet.total')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder
                    name="total"
                    rules={[
                    ]}
                  >
                    <Input size="large"  style={{width:'100%'}}/>
                  </IceFormBinder>
                  <IceFormError name="total" />
                </Col>
              </Row>

              {/*<Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('wallet.balance')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="balance" message= {_intl.get('public.required')}>
                    <Input
                      size="large"
                      style={{width:'100%'}}
                    />
                  </IceFormBinder>
                  <IceFormError name="balance" />
                </Col>
                  </Row>*/}

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('wallet.amt')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="amt"  message= {_intl.get('public.required')}>
                    <Input
                      size="large"
                      style={{width:'100%'}}
                    />
                  </IceFormBinder>
                  <IceFormError name="amt" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('wallet.fee')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="fee"  message= {_intl.get('public.required')}>
                    <Input
                      size="large"
                      style={{width:'100%'}}
                    />
                  </IceFormBinder>
                  <IceFormError name="fee" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('wallet.description')}：
                </Col>
                <Col xxs="16" s="12" l="10" style={{lineHeight:'32px'}}>
                  <IceFormBinder name="description"                     
                  rules={[
                    {min:5,max:40,message:_intl.get('wallet.checkdes')}
                  ]} 
                  message= {_intl.get('public.required')}>
                  <Input
                  size="large"
                  style={{width:'100%'}}
                  />
                  </IceFormBinder>
                  <IceFormError name="description" />
                </Col>
              </Row>

            </div>
          </IceFormBinderWrapper>

          {
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



export default Addrunwater;

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
  buttonfloat:{
    float:'right'
  }
};