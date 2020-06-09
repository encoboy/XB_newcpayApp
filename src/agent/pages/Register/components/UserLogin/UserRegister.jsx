/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Button, Checkbox, Grid,Form,Field,Select,Feedback } from '@icedesign/base';
import { Icon } from '@alifd/next';
import IceIcon from '@icedesign/icon';
import {getUserInfo} from '../../../../util';
import {connect} from 'react-redux';
import {changeLanguage} from '../../../../redux/action'
import sha1 from 'sha1';
import './UserRegister.scss';

const { Row, Col } = Grid;
const FormItem = Form.Item;
const Option = Select.Option;
const Toast = Feedback.toast;

// 寻找背景图片可以从 https://unsplash.com/ 寻找
const backgroundImage =
  'https://images.unsplash.com/photo-1492138786289-d35ea832da43?ixlib=rb-0.3.5&s=45ce9363014409bd2d61a459e976c561&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb';

@withRouter
class Register extends Component {
  static displayName = 'Register';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.field = new Field(this,{
        onChange:(name,value)=>{
          switch(name){
            case 'email':
              this.setState({emailValue:value});
              break;
            case 'code':
              break;
          }
      }
    });
    this.state = {
      language:{
        'zh-CN':'zh-cn',
        'en-US':'en-us',
      },
      loading: false,
      registerLoading:false,
      verify:true,
      waitTime:60,
      verifySuccess:false,
      currency:[],
      emailValue:'',
    };
  }
  componentDidMount(){
    this.getMoney();
  };
  componentWillUnmount(){
    clearTimeout(this.setLoginTime)
  }

  goLogin = ()=>{
    this.props.history.push('/login');
  }

  // 注册
  handleSubmit = (e) => {
    e.preventDefault();
    this.field.validate((errors, values) => {
      if (!errors) {
        this.setState({registerLoading:true});
        _fetch({
          url:'/Merchant/Login',
          data:{
            method:'register',
            username:values.username,
            password:sha1(values.username+values.password),
            email:values.email,
            currency:values.currency,
            code:values.code
          },
          success:(data)=>{
            console.log('register',data);
            Toast.success(_intl.get('public.registerSuccess'))
            this.goLoginTime();
          },
          error:()=>{
            this.setState({registerLoading:false});
          }
        });
      }
    });
  };

  // 2s后返回登录页面
  goLoginTime = () => {
    this.setLoginTime = setTimeout(this.goLogin,2000);
  }

  // 获取邮箱验证码时间
  agentEmainTime(){
    const {waitTime} = this.state;
    if(waitTime === 1){
      this.setState({
        waitTime:60,
        verify:true,
        loading:false
      })
    }else{
      this.setState({
        waitTime:waitTime - 1,
        verify:false
      });
      setTimeout(this.agentEmainTime.bind(this),1000);
    }
  }

  // 得到eamil参数
  emailChange = (value) => {
    this.setState({emailValue:value});
  }
  // 得到邮箱验证码
  getEmailVerfy = () => {
    const {emailValue} = this.state;
    this.setState({loading:true});
    _fetch({
      url:'/Merchant/Login',
      data:{
        method:'getcode',
        email:emailValue
      },
      success:(data)=>{
        console.log('getcode',data);
        this.agentEmainTime();
      },
      error:()=>{
        this.setState({loading:false});
      }
    })

  }

  // 获取货币
  getMoney = () => {
    _fetch({
      url:'/Merchant/Login',
      data:{
        method:'currency'
      },
      success:(data)=>{
        console.log('currency',data);
        this.setState({
          currency:data.data
        })
      }
    })
  }



  render() {
    const {loading,verify,waitTime,verifySuccess,currency,registerLoading} = this.state;
    const {language,setLanguage} = this.props;
    const init = this.field.init;
    return (
      <div style={styles.userLogin} className="user-register">
        <div
          style={{
            ...styles.userLoginBg,
            backgroundImage: `url(${backgroundImage})`,
          }}
        />
        <div style={styles.contentWrapper} className="content-wrapper">
          <h2 style={styles.slogan} className="slogan">
            {_intl.get('public.welcome')} <br /> ICE 内容管理系统
          </h2>
          <div style={styles.formContainer}>
            <div style={styles.language}>
              <Button type="normal" onClick={() => {setLanguage(language === 'zh-cn'?'en-us':'zh-cn')}}>{language === 'zh-cn'?'English':'中文'}</Button>
            </div>
            
            <div style={styles.formTitle}>
              <span style={{cursor:'pointer'}}>{_intl.get('public.register')}</span>
            </div>
            <Form  field={this.field} onSubmit={this.handleSubmit}>
              <div style={styles.formItems}>
                <Row style={styles.formItem}>
                  <Col>
                    <FormItem>
                      <IceIcon
                        type="person"
                        size="small"
                        style={styles.inputIcon}
                      />
                      <Input  maxLength={20} placeholder={_intl.get('public.username')} {...init("username",{rules:[
                        {required:true,message:_intl.get('public.required')}
                      ]})} />
                    </FormItem>
                  </Col>
                </Row>
                <Row style={styles.formItem}>
                  <Col>
                    <FormItem>
                      <IceIcon
                        type="lock"
                        size="small"
                        style={styles.inputIcon}
                      />
                      <Input htmlType="password" placeholder={_intl.get('public.password')} {...init("password",{rules:[
                        {required:true,message:_intl.get('public.required')}
                      ]})} />
                    </FormItem>
                  </Col>
                </Row>
                <Row style={styles.formItem}>
                  <Col>
                    <FormItem>
                      <IceIcon
                        type="mail"
                        size="small"
                        style={styles.inputIcon}
                      />
                      <Input htmlType="email" placeholder={_intl.get('public.email')} {...init("email",{rules:[
                        {required:true,message:_intl.get('profile.emailtrue'),pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/ }
                      ]})} />
                    </FormItem>
                  </Col>
                </Row>
                <Row style={styles.formSelectItem}>
                <Col>
                  <FormItem>
                  <Icon
                    type="dollar"
                    size="small"
                    style={styles.inputIcon}
                  />
                    <Select  placeholder={_intl.get('public.currency')} style={{width:'216px',marginLeft:'25px'}}
                      {...init("currency",{rules:[{required:true,message:_intl.get('public.required')}]})} >
                      {currency.map((item,index)=>{
                        return(
                          <Select.Option value={item.id} key={index}>{item.code}</Select.Option>
                        )
                      })}
                    </Select>
                    </FormItem>
                  </Col>
                </Row>
                <Row style={styles.formItem} >
                <Col>
                  <FormItem>
                    <IceIcon
                      type="lock"
                      size="small"
                      style={styles.inputIcon}
                    />
                    <Input htmlType="verify" maxLength="6"  style={{width:'110px'}} placeholder={_intl.get('public.emailVerfy')} 
                      {...init("code",{rules:[
                      {required:true,message:_intl.get('public.required')}
                    ]})} />
                    {verify?<Button loading={loading} onClick={loading?null:this.getEmailVerfy}  type="primary">{loading?_intl.get('public.getEmailWaiting'):_intl.get('public.getemailVerfy')}</Button>
                          :<Button disabled type="primary" style={{color:'black'}}>{_intl.get('public.getemailTime')}({waitTime}S)</Button>}   
                    </FormItem>
               
                
                </Col>
              </Row>
                <Row style={styles.formItem}>
                  <Button
                    loading={registerLoading}
                    type="primary"
                    htmlType='submit'
                    style={styles.submitBtn}
                  >
                  {registerLoading?_intl.get('public.loading'):_intl.get('public.register')}
                  </Button>
                </Row>
                <div style={styles.bottomLogin}>
                  <span style={{cursor:'pointer'}} onClick={this.goLogin}>{_intl.get('login.login')}</span>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    language:state.language
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setLanguage:(language)=>dispatch(changeLanguage(language)),
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(Register)

const styles = {
  userLogin: {
    position: 'relative',
    height: '100vh',
  },
  userLoginBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: 'cover',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '30px 40px',
    background: '#fff',
    borderRadius: '6px',
    boxShadow: '1px 1px 2px #eee',
  },
  formItem: {
    position: 'relative',
    marginBottom: '5px',
    flexDirection: 'column',
  },
  formSelectItem:{
    position: 'relative',
    flexDirection: 'column',
  },
  formTitle: {
    margin: '20px 0 20px',
    textAlign: 'center',
    color: '#3080fe',
    letterSpacing: '3px',
    fontSize:'15px'
  },
  bottomLogin:{
    margin: '20px 0 0 0',
    color: '#3080fe',
    letterSpacing: '3px',
    fontSize:'14px',
    float:'right'
  },
  inputIcon: {
    position: 'absolute',
    left: '0px',
    top: '3px',
    color: '#999',
  },
  submitBtn: {
    width: '245px',
    background: '#3080fe',
    borderRadius: '28px',
  },
  checkbox: {
    marginLeft: '5px',
  },
  tips: {
    textAlign: 'center',
  },
  link: {
    color: '#999',
    textDecoration: 'none',
    fontSize: '13px',
  },
  language:{
    textAlign:'right',
    cursor:'pointer'
  },
  line: {
    color: '#dcd6d6',
    margin: '0 8px',
  },
};
