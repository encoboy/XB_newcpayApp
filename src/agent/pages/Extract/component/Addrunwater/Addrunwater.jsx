/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Feedback ,Radio,Select} from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import './Addrunwater.scss';
import {connect} from 'react-redux';

const { Group: RadioGroup } = Radio;
const { Row, Col } = Grid;
const Toast = Feedback.toast;
const {Combobox} = Select;

class Addrunwater extends Component {
  static displayName = 'UserForm';

  static propTypes = {};

  static defaultProps = {};

  
  constructor(props) {
    super(props);
    this.state = {
      value: {

      },
      username:[]
    };
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };
  componentDidMount(){
    // this.getUsername()
    console.log(this.props.moneydata);
  }
  validateAllFormField = () => {
    
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        return;
      }
      _fetch({
        url:'/Merchant/Agentaccount',
        data:{
          method:'addjournal',
          ledgerid:this.props.moneydata.id,
          ...values
        },
        success:(data)=>{
          console.log(data);
          this.setState({value:{}});
          Toast.success(_intl.get('usercard.tip'));
          // this.props.history.push('/merchant/list')
        }
      });

    });
  };
  render() {
    const {goback} = this.props;
    const {username} = this.state;
    return (
      <div className="user-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>{_intl.get('myfinance.addrunwater')}
              <Button style={styles.floatRight} type='normal' shape='text' style={styles.floatRight}
              onClick={goback}>{_intl.get('myfinance.goback')}</Button>
              </h2>
              
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('myfinance.type')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder
                    name="type"
                    rules={[
                      {required:true,message:_intl.get('public.required')},
                      {min:5,max:12,message:_intl.get('myfinance.max')}
                    ]}
                  >
                  <Select
                    placeholder={_intl.get('myfinance.type')}
                    style={{width:'100%'}}
                    
                  >
                  <Option value="withdraw">{_intl.get('myfinance.withdraw')}</Option>
                  <Option value="deposit">{_intl.get('myfinance.deposit')}</Option>
                  <Option value="transfer">{_intl.get('myfinance.transfer')}</Option>
                  </Select>
                  </IceFormBinder>
                  <IceFormError name="type"  />
                </Col>
              </Row>

              <Row style={styles.formItem}>
              <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                {_intl.get('myfinance.typeid')}：
              </Col>
              <Col xxs="16" s="12" l="10">
                <IceFormBinder name="typeid"
                rules={[
                  {required:true,  message:_intl.get('myfinance.mustnumber')},
                ]}
                >
                  <Input
                    size="large"
                    style={{width:'100%'}}
                  />
                </IceFormBinder>
                <IceFormError name="typeid" />
              </Col>
              </Row>
              
              <Row style={styles.formItem}>
              <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                {_intl.get('myfinance.amount')}：
              </Col>
              <Col xxs="16" s="12" l="10">
                <IceFormBinder name="amount"
                rules={[
                  {required:true,message:_intl.get('public.required')},
                ]}
                >
                  <Input
                    size="large"
                    style={{width:'100%'}}
                  />
                </IceFormBinder>
                <IceFormError name="amount" />
              </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('myfinance.financedes')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="description"
                  rules={[
                    {required:true,message:_intl.get('public.required')},
                  ]}
                  >
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

const mapStateToProps = (state) => {
  return {
    btn:state.operation.btn,
    language:state.language
  }
}
export default connect(mapStateToProps)(Addrunwater);

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
  floatRight:{
    float:'right'
  }
};
