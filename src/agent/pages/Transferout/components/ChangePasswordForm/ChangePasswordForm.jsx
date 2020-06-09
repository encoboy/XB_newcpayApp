/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import {UrlSearch} from '../../../../util'
import { Input, Grid, Button, Feedback,Select,Card } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

import './ChangePasswordForm.scss';

const { Row, Col } = Grid;
const Toast = Feedback.toast;

export default class ChangePasswordForm extends Component {
  static displayName = 'ChangePasswordForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    const values = new UrlSearch();
    this.state = {
      account:[],
      balance:'',
      value: {
        fromaccountname: null,
        usermes:values.userid,
        tocardnumber:`${values.bank.toUpperCase()} — ${values.account}`,
        amount:values.amount,
        withdrawid:values.withdrawid
      },
    };
  }

  componentDidMount(){
    this.getAccount();
    // const values = new UrlSearch();
    // if(values){
    //   this.setState({
    //     usermes:values.userid,
    //     tocardnumber:values.account,
    //     amount:values.amount
    //   })
    // }

  }
  getAccount = () => {
    const values = new UrlSearch();
    _fetch({
      url:'/Merchant/Bankaccount',
      data:{
        method:'getnumber',
        merchantid:values.merchantid,
        type:2
      },
      success:(data)=>{
        this.setState({
          account:data.data
        })
      }
    })
  };
  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        return;
      }
      const params = new UrlSearch();
      _fetch({
        url:'/Merchant/Transfer',
        data:{
          method:'transferout',
          ...values,
          tocardnumber:params.account
        },
        success:()=>{
          this.setState({
            value: {
              fromaccountname: null,
              usermes:'',
              tocardnumber:'',
              amount:values.amount
            },
          });
          Toast.success(_intl.get('transfer.tip'));
          this.props.history.goBack()
        }
      });
    });
  };
  handleChane=(val)=>{
    const {account} = this.state;
    const balance = account.filter(function (item) {
      return item.number === val
    })[0].available_balance;
    this.setState({
      balance
    })
  };
  render() {
    return (
      <div className="change-password-form">
        <Card
          // titleBottomLine={false}
          style={{ width: '100%' }}
          bodyHeight='auto'
          title={_intl.get('withdraw.transfer')}
        >
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formContent}>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('order.from_account')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder
                    name="fromaccountname"
                    required
                    message={_intl.get('public.required')}
                  >
                    <Select
                      style={{width:'100%'}}
                      size="large"
                      onChange={this.handleChane}
                      // placeholder="请选择..."
                    >
                      {
                        this.state.account.map(function (item,index) {
                          return(
                            <Select.Option value={item.number} >{item.bank.toUpperCase()} — {item.number}</Select.Option>
                          )
                        })
                      }
                    </Select>
                  </IceFormBinder>
                  {
                    this.state.balance&&
                    <div>
                      {_intl.get('bank.available_balance')}：
                      <strong style={{color:'red'}}>{this.state.balance}</strong>
                    </div>
                  }
                  <IceFormError name="fromaccountname" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('order.to_account')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder
                    name="tocardnumber"
                    required
                    message={_intl.get('public.required')}
                  >
                    <Input
                      size="large"
                      style={{width:'100%'}}
                      readOnly
                    />
                  </IceFormBinder>
                  <IceFormError name="tocardnumber" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('transfer.amount')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder
                    name="amount"
                    required
                    message={_intl.get('public.required')}
                  >
                    <Input
                      size="large"
                      style={{width:'100%'}}
                      readOnly
                    />
                  </IceFormBinder>
                  <IceFormError name="amount" />
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
        </Card>
      </div>
    );
  }
}

const styles = {
  formContent: {
    width: '100%',
    marginTop:'10px',
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
