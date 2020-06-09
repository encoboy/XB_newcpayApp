/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Feedback ,Radio,Select} from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import {hasAction} from '../../../../util';
import {connect} from 'react-redux';
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
      merchant:[],
      value: {
        type:null,
        merchantid:null,
        serverId:'',
        accountId:'',
        status:'',
        taskcount:'',
        ip:'',
        port:'',
        publicip:'',
        publicport:'',
      }
  }}
  componentDidMount(){
    this.getMerchant()
    // console.log(this.refs.form)
  }
  getMerchant=()=>{
    _fetch({
      url:'/Manager/Merchant',
      data:{
        method:'merchants',
      },
      success:(data)=>{
        this.setState({merchant:data.merchants});
        // Toast.success(_intl.get('usercard.tip'));
        // this.props.history.push('/wallet/usercards')
      }
    });
  };
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
      // values.password=sha1(values.username+values.password);
      for(const i in values){
        if(!values[i]){
          delete values[i]
        }
      }
      _fetch({
        url:'/Manager/Robot',
        data:{
          method:'addrobot',
          ...values
        },
        success:()=>{
          this.setState({value:{
            type:null,
            merchantid:null,
            serverId:'',
            accountId:'',
            status:'',
            taskcount:'',
            ip:'',
            port:'',
            publicip:'',
            publicport:'',
          }});
          Toast.success(_intl.get('usercard.tip'));
          this.props.history.push('/robot/list')
        }
      });

    });
  };

  render() {
    const {merchant} = this.state;
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
              <h2 style={styles.formTitle}>{/*_intl.get('sider.robot_add')*/}</h2>
              <Row style={styles.formItem}>
              <Col xxs="6" s="4" l="3" style={styles.formLabel}>
              <span style={{color:"red",fontSize:"16px"}}>* &nbsp;</span>{_intl.get('robot.robotnumber')}：
              </Col>
              <Col xxs="16" s="12" l="10">
                <IceFormBinder name="robotid"  rules={[
                  {pattern:/^[0-9]+([.]{1}[0-9]+){0,1}$/,message:_intl.get('wallet.mustnumber')},
                  {required:'true',message:_intl.get('public.required')}
                ]} >
                  <Input
                    size="large"
                    style={{width:'100%'}}
                  />
                </IceFormBinder>
                <IceFormError name="robotid" />
              </Col>
            </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  <span style={{color:"red",fontSize:"16px"}}>* &nbsp;</span>{_intl.get('robot.type')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="type" required='true' message= {_intl.get('public.required')} >
                    {/*<Input size="large"  style={{width:'100%'}}/>*/}
                    <Select  style={{width:'100%'}}>
                      <Select.Option value="2">  {_intl.get('robot.2')}</Select.Option>
                      <Select.Option value="3">  {_intl.get('robot.3')}</Select.Option>
                      <Select.Option value="4">  {_intl.get('robot.4')}</Select.Option>
                    </Select>
                  </IceFormBinder>
                  <IceFormError name="type" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                <span style={{color:"red",fontSize:"16px"}}>* &nbsp;</span>{_intl.get('robot.merchant')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="merchantid"  required='true' message= {_intl.get('public.required')}>
                    <Select  style={{width:'100%'}}>
                      {
                        merchant.map(function (item,index) {
                          return(
                            <Select.Option key={index} value={item.id}>{item.username&&item.username.toUpperCase()}</Select.Option>
                          )
                        })
                      }
                    </Select>
                  </IceFormBinder>
                  <IceFormError name="merchantid" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('robot.serverid')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="serverId"  >
                    <Input size="large" style={{width:'100%'}}/>
                  </IceFormBinder>
                  <IceFormError name="serverId" />
                </Col>
              </Row>
              {/*<Row style={styles.formItem}>*/}
                {/*<Col xxs="6" s="4" l="3" style={styles.formLabel}>*/}
                  {/*{_intl.get('robot.name')}：*/}
                {/*</Col>*/}
                {/*<Col xxs="16" s="12" l="10">*/}
                  {/*<IceFormBinder name="name"   required message= {_intl.get('public.required')}>*/}
                    {/*<Input*/}
                      {/*size="large"*/}
                      {/*style={{width:'100%'}}*/}
                    {/*/>*/}
                  {/*</IceFormBinder>*/}
                  {/*<IceFormError name="name" />*/}
                {/*</Col>*/}
              {/*</Row>*/}
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                {_intl.get('robot.accountid')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="accountId">
                    <Input
                      size="large"
                      style={{width:'100%'}}
                    />
                  </IceFormBinder>
                  <IceFormError name="accountId" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('public.status')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="status"  >
                    <Input
                      size="large"
                      style={{width:'100%'}}
                    />
                  </IceFormBinder>
                  <IceFormError name="status" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('robot.taskcount')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="taskcount"  >
                    <Input
                      size="large"
                      style={{width:'100%'}}
                    />
                  </IceFormBinder>
                  <IceFormError name="taskcount" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                <span style={{color:"red",fontSize:"16px"}}>* &nbsp;</span>{_intl.get('robot.ip')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="ip" required='true' message= {_intl.get('public.required')}>
                    <Input
                      size="large"
                      style={{width:'100%'}}
                    />
                  </IceFormBinder>
                  <IceFormError name="ip" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                <span style={{color:"red",fontSize:"16px"}}>* &nbsp;</span>{_intl.get('robot.port')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="port" required='true' message= {_intl.get('public.required')}>
                    <Input
                      size="large"
                      style={{width:'100%'}}
                    />
                  </IceFormBinder>
                  <IceFormError name="port" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('robot.publicip')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="publicip"   >
                    <Input
                      size="large"
                      style={{width:'100%'}}
                    />
                  </IceFormBinder>
                  <IceFormError name="publicip" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('robot.publicport')}：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="publicport"  >
                    <Input
                      size="large"
                      style={{width:'100%'}}
                    />
                  </IceFormBinder>
                  <IceFormError name="publicport" />
                </Col>
              </Row>
              {/*<Row style={styles.formItem}>*/}
                {/*<Col xxs="6" s="4" l="3" style={styles.formLabel}>*/}
                  {/*{_intl.get('merchantlist.lang')}：*/}
                {/*</Col>*/}
                {/*<Col xxs="16" s="12" l="10" style={{lineHeight:'32px'}}>*/}
                  {/*<IceFormBinder name="lang"   required message= {_intl.get('public.required')}>*/}
                    {/*<RadioGroup dataSource={[{value:'zh-CN',label:"中文"},{value:'en-US',label:"English"}]} />*/}
                  {/*</IceFormBinder>*/}
                  {/*<IceFormError name="lang" />*/}
                {/*</Col>*/}
              {/*</Row>*/}
            </div>
          </IceFormBinderWrapper>

          <Row style={{ marginTop: 20 }}>
            <Col offset="3">
              {hasAction(btn,'Robot_addrobot')&&<Button
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
  return{
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
