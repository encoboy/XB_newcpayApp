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
import {hasAction} from '../../../../util';
import {connect} from 'react-redux';

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
        bank:''
        // tobank: '',
        // toaccount: '',
        // toname: '',
      },
      merchantlist:[]
    };
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };
  componentDidMount(){
    this.getMerchant();
  }
  // 得到银行
  getMerchant = () => {
    _fetch({
        url:'/Merchant/PG',
        data:{
            method:'getpgbank'
        },
        success:(data)=>{
            console.log(data);
            this.setState({
                merchantlist:data.data
            })
        },
        error:(error)=>{
            console.log(error);
        }
    })
  }

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        return;
      }
      _fetch({
        url:'/Merchant/PG',
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
    const {merchantlist} = this.state;
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
              <h2 style={styles.formTitle}>{/*_intl.get('sider.pg_create')*/}</h2>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('pg.tobank')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="bank" required message= {_intl.get('public.required')}>
                    <Select style={{width:'100%'}}>
                    {
                      merchantlist.map(function (item,index) {
                        return(
                        <Select.Option key={index} value={item.toUpperCase()}>{item.toUpperCase()}</Select.Option>
                        )
                      })
                    }
                </Select>
                  </IceFormBinder>
                  <IceFormError name="bank" />
                </Col>
              </Row>

              {/*<Row style={styles.formItem}>
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
                  </Row>*/}

            </div>
          </IceFormBinderWrapper>

          <Row style={{ marginTop: 20 }}>
            <Col offset="3">
              {hasAction(btn,'PG_addpg')&&<Button
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

const mapStateToProps = (state, ownProps) => {
  return {
    btn: state.operation.btn,
    language:state.language
  }
}

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
