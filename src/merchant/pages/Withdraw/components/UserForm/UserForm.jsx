/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Select, Feedback } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { connect } from 'react-redux'
import {hasAction} from '../../../../util';
import './UserForm.scss';

const { Row, Col } = Grid;
const Toast = Feedback.toast;
 class UserForm extends Component {
  static displayName = 'UserForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      data:{},
      card:[],
      value: {
        cardid: null,
        amount: '',
        tranpass:''
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
        url:'/User/Withdraw',
        data:{
          method:'dowithdraw',
          ...values
        },
        success:()=>{
          this.setState({
            value: {
              cardid: null,
              amount: '',
              tranpass:''
            },
          },()=>{
            Toast.success(_intl.get('public.success'));
            // this.props.history.push('/wallet/usercards')
          });
        }
      });

    });
  };
  componentDidMount(){
    this.getCard();
    this.getWallet()
  }
  getCard = () => {
    _fetch({
      url:'/User/Usercards',
      data:{
        method:'getusercards',
      },
      success:(data)=>{
       this.setState({
         card:data.data.filter(function (item) {
           return item.status === 1
         })
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
  render() {
    const {card,data} = this.state;
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
              <h2 style={styles.formTitle}>{/*_intl.get('sider.wallet_withdraw')*/}</h2>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('withdraw.account')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="cardid"   required  message= {_intl.get('public.required')}>
                    <Select style={{width:'100%'}}>
                      {
                        card.map(function (item,index) {
                          return(
                            <Select.Option key={index} value={String(item.id)}>{item.bank.toUpperCase()} - {item.number}</Select.Option>
                          )
                        })
                      }
                    </Select>
                  </IceFormBinder>
                  <IceFormError name="cardid" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('withdraw.amount')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="amount"    required message= {_intl.get('public.required')}>
                    <Input
                      style={{width:'100%'}}
                      size="large"
                    />
                  </IceFormBinder>
                  <IceFormError name="amount" />
                  <div style={{marginTop:'10px'}}>
                    {_intl.get('withdraw.balance')}
                    <span style={{color:'red'}}>{data.balance}</span>
                  </div>
                  <div style={{marginTop:'10px'}}>
                    {_intl.get('walletinfo.withdraw_limit')}：
                    <span style={{color:'red'}}>{data.limit_withdraw_min}</span>
                    ～
                    <span style={{color:'red'}}>{data.limit_withdraw_max}</span>
                  </div>
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
            hasAction(btn,'Withdraw_dowithdraw')&&
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

export default connect(mapStateToProps)(UserForm)
