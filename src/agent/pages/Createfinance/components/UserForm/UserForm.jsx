/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Feedback ,Radio,Select} from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import './UserForm.scss';
import {connect} from 'react-redux';
import {hasAction} from '../../../../util';

const { Group: RadioGroup } = Radio;
const { Row, Col } = Grid;
const Toast = Feedback.toast;
const {Combobox} = Select;

class UserForm extends Component {
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
  }
  validateAllFormField = () => {
    
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        return;
      }
      _fetch({
        url:'/Merchant/Agentaccount',
        data:{
          method:'addaccount',
          ...values
        },
        success:(data)=>{
          console.log(data);
          this.setState({value:{}});
          Toast.success(_intl.get('usercard.tip'));
          this.props.history.push('/mymoneynumber/financelist');
        }
      });

    });
  };
  render() {
    const {btn} = this.props;
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
              <h2 style={styles.formTitle}>{_intl.get('sider.addfinance')}</h2>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('myfinance.financename')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder
                    name="name"
                    rules={[
                      {required:true,message:_intl.get('public.required')},
                      {min:5,max:20,message:_intl.get('myfinance.max')}
                    ]}
                  >
                  <Input style={{width:"100%"}}/>
                  </IceFormBinder>
                  <IceFormError name="name"  />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('myfinance.description')}：
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
    
              {/*<Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('myfinance.type')}：
                </Col>
                <Col xxs="16" s="12" l="10" style={{lineHeight:'32px'}}>
                  <IceFormBinder name="type"   required message= {_intl.get('public.required')}>
                    <RadioGroup dataSource={[{value:'bank',label:"银行"},{value:'person',label:"个人"}]} />
                  </IceFormBinder>
                  <IceFormError name="type" />
                </Col>
                </Row>*/}
            </div>
          </IceFormBinderWrapper>

          <Row style={{ marginTop: 20 }}>
            <Col offset="3">
              {hasAction(btn,'Amend_addfinance')&&<Button
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
