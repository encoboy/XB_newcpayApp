/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Select, Feedback } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
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
        tobank: '',
        toaccount: '',
        toname: '',
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
        url:'/merchant/PG',
        data:{
          method:'addpg',
          ...values
        },
        success:()=>{
          Toast.success(_intl.get('usercard.tip'));
          this.props.history.push('/PG/list')
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
              <h2 style={styles.formTitle}>{/*_intl.get('public.addpg')*/}</h2>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('pg.tobank')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="tobank" required message= {_intl.get('public.required')}>
                    <Input size="large"  style={{width:'100%'}}/>
                  </IceFormBinder>
                  <IceFormError name="tobank" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('pg.toaccount')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="toaccount"   required  message= {_intl.get('public.required')}>
                    <Input size="large"  style={{width:'100%'}}/>
                  </IceFormBinder>
                  <IceFormError name="toaccount" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('pg.toname')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="toname"   required message= {_intl.get('public.required')}>
                    <Input
                      size="large"
                      style={{width:'100%'}}
                    />
                  </IceFormBinder>
                  <IceFormError name="toname" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('public.code')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="code"   required message= {_intl.get('public.required')}>
                    <Input
                      size="large"
                      style={{width:'100%'}}
                    />
                  </IceFormBinder>
                  <IceFormError name="code" />
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
