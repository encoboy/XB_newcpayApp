/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button,Select,Dialog } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { connect } from 'react-redux'
import {hasAction} from '../../../../util';
import './ChangePasswordForm.scss';

const { Row, Col } = Grid;


 class ChangePasswordForm extends Component {
  static displayName = 'ChangePasswordForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      data:{},
      bank:[],
      balances:'',
      value: {
        orderid: '',
        bank: null,
        amount: '',
        tranpass: '',
      },
    };
  }

  componentDidMount(){
    this.getBank();
    this.getWallet()
  }
  getBank = () => {
    _fetch({
      url:'/User/Usercards',
      data:{
        method:'allbanks',
      },
      success:(data)=>{
        const bank = [];
        data.banks&&data.banks.map(function (item) {
          const obj = {
            label:item.toUpperCase(),
            value:item
          };
          bank.push(obj)
        });
        this.setState({
          bank:bank
        })
      }
    })
  };
  getWallet=()=>{
    _fetch({
      url:'/User/Userwallet',
      data:{
        method:'getwallet'
      },
      success:(data)=>{
        this.setState({
          data:data.data?data.data:{}
        })
      }
    })
  };
  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        return;
      }
      console.log(values)
      _fetch({
        url:'/User/Deposit',
        data:{
          method:'addorder',
          ...values
        },
        success:(data)=>{
          this.setState({
            value: {
              orderid: '',
              bank: null,
              amount: '',
              tranpass: '',
            },
          });
         Dialog.confirm({
           locale: {
             ok: _intl.get('order.go'),
           },
           content:  <a href={data.data.redirect} target="_blank">{data.data.redirect}</a>,
           onOk:()=>{
             window.open(data.data.redirect,"_blank");
           }
         })
        }
      });
    });
  };

  render() {
    const {data} = this.state;
    const {btn} = this.props;
    return (
      <div className="change-password-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>{/*_intl.get('sider.order_receipt')*/}</h2>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('transfer.tobank')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder
                    name="bank"
                    required
                    message={_intl.get('public.required')}
                  >
                    <Select
                      style={{width:'100%'}}
                      size="large"
                      // placeholder="请选择..."
                      dataSource={this.state.bank}
                    />
                  </IceFormBinder>
                  <IceFormError name="bank" />
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
                    />
                  </IceFormBinder>
                  <IceFormError name="amount" />
                  <div style={{marginTop:'10px'}}>
                    {_intl.get('withdraw.balance')}
                    <span style={{color:'red'}}>{data.balance}</span>
                  </div>
                  <div style={{marginTop:'10px'}}>
                    {_intl.get('walletinfo.deposit_limit')}：
                    <span style={{color:'red'}}>{data.deposit_min}</span>
                    ～
                    <span style={{color:'red'}}>{data.deposit_max}</span>
                  </div>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('transfer.orderid')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder
                    name="orderid"
                    // required
                    // message={_intl.get('public.required')}
                  >
                    <Input
                      size="large"
                      style={{width:'100%'}}
                    />
                  </IceFormBinder>
                  <IceFormError name="orderid" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('password.tranpass')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder
                    name="tranpass"
                    required
                    message={_intl.get('public.required')}
                  >
                    <Input
                      size="large"
                      style={{width:'100%'}}
                    />
                  </IceFormBinder>
                  <IceFormError name="tranpass" />
                </Col>
              </Row>
            </div>
          </IceFormBinderWrapper>

          {
            hasAction(btn,'Deposit_addorder')&&
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
