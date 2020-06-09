/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Select, Feedback } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import {connect} from 'react-redux'
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
      bank:[],
      value: {
        holder: '',
        bank: null,
        number: '',
        code: '',
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
        url:'/User/Usercards',
        data:{
          method:'addcard',
          ...values
        },
        success:()=>{
          Toast.success(_intl.get('usercard.tip'));
          this.props.history.push('/wallet/usercards')
        }
      });

    });
  };
  componentDidMount(){
    this.getBank()
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
  render() {
    const {bank} = this.state;
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
              <h2 style={styles.formTitle}>{/*_intl.get('sider.wallet_addbankcard')*/}</h2>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('usercard.bank')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="bank" required message= {_intl.get('public.required')}>
                    <Select
                      style={{width:'100%'}}
                      size="large"
                      // placeholder="请选择..."
                      dataSource={bank}
                    />
                  </IceFormBinder>
                  <IceFormError name="bank" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('usercard.number')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="number"   required  message= {_intl.get('public.required')}>
                    <Input size="large"  style={{width:'100%'}}/>
                  </IceFormBinder>
                  <IceFormError name="number" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('usercard.holder')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="holder"   required message= {_intl.get('public.required')}>
                    <Input
                      size="large"
                      style={{width:'100%'}}
                    />
                  </IceFormBinder>
                  <IceFormError name="holder" />
                </Col>
              </Row>
              {/*<Row style={styles.formItem}>*/}
                {/*<Col xxs="6" s="4" l="3" style={styles.formLabel}>*/}
                  {/*{_intl.get('public.code')}：*/}
                {/*</Col>*/}
                {/*<Col xxs="16" s="12" l="10">*/}
                  {/*<IceFormBinder name="code"   required message= {_intl.get('public.required')}>*/}
                    {/*<Input*/}
                      {/*size="large"*/}
                      {/*style={{width:'100%'}}*/}
                    {/*/>*/}
                  {/*</IceFormBinder>*/}
                  {/*<IceFormError name="code" />*/}
                {/*</Col>*/}
              {/*</Row>*/}
            </div>
          </IceFormBinderWrapper>

          {
            hasAction(btn,'Usercards_addcard')&&
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
