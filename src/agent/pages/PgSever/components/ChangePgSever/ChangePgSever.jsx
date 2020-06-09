/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Feedback,Switch,Form,Field,Loading,Radio  } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import sha1 from 'sha1'
import {getUserInfo,hasAction} from '../../../../util'
import {connect} from 'react-redux'
import ChangeApiDialog from './ChangeApiDialog';
import './ChangePgSever.scss';

const { Row, Col } = Grid;
const Toast = Feedback.toast;
const FormItem = Form.Item;
const { Group: RadioGroup } = Radio;


 class ChangePgSever extends Component {
  static displayName = 'ChangePgSever';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {

      },
      isLoading:true,
      pg_control: '',
      extra_control:'',
      apiData:'',
      apiValue:''
    };
    this.field = new Field(this);
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };
  
  getData = () => {
    _fetch({
      url:'/Merchant/Profile',
      data:{
        method:'servicecontrol'
      },
      success:(data)=>{
        console.log('servicecontrol',data);
        this.setState({
          pg_control:data.data.pg_control,
          extra_control:data.data.extra_control,
          apiData:data.data.api_url,
          isLoading:false
        })
      }
    })
  }

  // PG服务开关更新
  pghandleChange = (value) => {
    let pg_control;
    if(value){
      pg_control = 1;
    }else{
      pg_control = 2;
    }
    _fetch({
      url:'/Merchant/Profile',
      data:{
        method:'updatepgcontrol',
        pg_control:pg_control
      },
      success:(data)=>{
        console.log('updatepgcontrol',data);
      }
    });
  }

  // 银行费用收取更新
  bankHandleChange = (value) => {
    _fetch({
      url:'/Merchant/Profile',
      data:{
        method:'updateextra',
        extra_control:value
      },
      success:(data)=>{
        console.log('updateextra',data);
      }
    });
  }

    // 更改代理API地址
  getAPIValue = (value) => {
      this.setState({
          apiValue:value
      })
  }
  updateApi = () =>{
      const {apiValue} = this.state;
      let reg = /(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?/;
      if(!reg.test(apiValue)){
        Toast.error(_intl.get('public.agentApiTrue'));
        return;
      }
      _fetch({
      url:'/Merchant/Profile',
      data:{
          method:'updateapi',
          api_url:apiValue
      },
      success:(data)=>{
          console.log('updateapi',data);
          Toast.success(_intl.get('sub.tip'));
          this.getData();
      }
      });
  }




  componentDidMount(){
    this.getData();
  }

  render() {
    const {pg_control,extra_control,isLoading,apiData} = this.state;
    const init = this.field.init;
    let checkedValue;
    if(pg_control==1){
      checkedValue = true;
    }else if(pg_control==2){
      checkedValue = false;
    };
    let list = [
      {
        value:1,
        label:_intl.get('operation.ncpayagent')
      },
      {
        value:2,
        label:_intl.get('operation.ncpaymerchant')
      }
    ]
    return (
      <div className="change-password-form">
        <IceContainer>
   
            {isLoading?<Loading/>:<div style={styles.formContent}>
              <h2 style={styles.formTitle}></h2>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  {_intl.get('public.pgseverswitch')}：
                </Col>
                <Col xxs="16" s="10" l="6">
                  <Switch defaultChecked={checkedValue}  onChange={(value)=>this.pghandleChange(value)}/>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabelbank}>
                  {_intl.get('public.takeBankMoney')}：
                </Col>
                <Col xxs="16" s="10" l="6">
                 <RadioGroup style={{paddingTop:'7px'}} dataSource={list} defaultValue={extra_control} onChange={this.bankHandleChange}/>
                </Col>
              </Row>
              {/*<Row>
                <Col xxs="6" s="4" l="3" style={styles.formLabelbank}>
                  {_intl.get('public.agentApi')} ：
                </Col>
                <Col xxs="12" s="10" l="10">
                  <Input defaultValue={apiData} style={{width:'300px'}} onChange={(value)=>this.getAPIValue(value)}/>
                  <Button type="primary" onClick={this.updateApi} style={{marginLeft:'5px'}}>{_intl.get('operation.Modify_API')}</Button>
                </Col>
                <div>
              </div>
              </Row>*/}
              {/*<Row style={{marginTop:'5px'}}>
                <Col offset="3">
                  <span>
                  <ChangeApiDialog getData={this.getData} apiData={apiData}/>
                  </span>
                </Col>
            </Row>*/}
            </div>}
          

        </IceContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language:state.language,
    btn:state.operation.btn
  }
};

export default connect(mapStateToProps)(ChangePgSever)

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
  formLabelbank:{
    height: '32px',
    lineHeight: '32px',
    textAlign: 'right',
    // marginLeft:'10px'
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
};
