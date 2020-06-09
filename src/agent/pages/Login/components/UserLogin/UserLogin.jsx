/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Button, Checkbox, Grid,Form,Field,Icon,Balloon } from '@icedesign/base';
import IceIcon from '@icedesign/icon';
import {getUserInfo,lang} from '../../../../util';
import {connect} from 'react-redux';
import {changeLanguage} from '../../../../redux/action'
import sha1 from 'sha1';
import './UserLogin.scss';

const { Row, Col } = Grid;
const FormItem = Form.Item;

// 寻找背景图片可以从 https://unsplash.com/ 寻找
const backgroundImage =
  'https://images.unsplash.com/photo-1492138786289-d35ea832da43?ixlib=rb-0.3.5&s=45ce9363014409bd2d61a459e976c561&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb';

@withRouter
class UserLogin extends Component {
  static displayName = 'UserLogin';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.field = new Field(this);
    this.state = {
      language:{
        'zh-CN':'zh-cn',
        'en-US':'en-us',
      },
      loading: false,
      agentLogo:'',
      favicon:'',
      title:''
    };
  }
  componentDidMount(){
    const user = getUserInfo();
    this.getLogoData();
    this.field.setValues({
      username:user.password&&user.username||undefined,
      password:user.password||undefined,
      checked:!!user.password
    });
    
    let agentTitle = window.localStorage.getItem('agent_title');
    if(agentTitle === undefined || agentTitle === null){
      document.title = '\u200E';
    }else{
      document.title = agentTitle;
    }

  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.field.validate((errors, values) => {
      if (!errors) {
        this.setState({loading:true});
        _fetch({
          url:'/Merchant/Login',
          data:{
            method:'dologin',
            username:values.username.toLowerCase(),
            password:sha1(values.username.toLowerCase()+values.password),
            jwt:undefined
          },
          success:(data)=>{
            if(values.checked){
              localStorage.setItem('agent-password',values.password);
            }else {
              // localStorage.removeItem('ice-username');
              localStorage.removeItem('agent-password');
            }
            localStorage.setItem('agent-username',values.username);
            window.localStorage.setItem('agent_jwt',data.jwt);
            // const {language} = this.state;
            // this.props.setLanguage(language[data.lang]||'zh-cn');
            // this.getLogoData();
            this.props.history.push('/profile');
          },
          error:()=>{
            this.setState({loading:false});
          }
        });
      }
    });
  };
  

  // 获取logo图标
  getLogoData = () => {
    _fetch({
      url:'/Merchant/Init',
      success:(data)=>{
        this.setState({
            agentLogo:data.data.logo,
            favicon:data.data.favicon,
            title:data.data.title
        })
      }
    })
  }

  goRegister = () => {
    this.props.history.push('/register');
  }

  setLanguage = (e) => {
    e.preventDefault();
    const lang = e.target.getAttribute('data-lang');
    this.props.setLanguage(lang);
  };

  render() {
    const {loading,agentLogo,favicon,title} = this.state;
    const {language,setLanguage} = this.props;
    const init = this.field.init;

  // 设置网页主题小图标
    var linkEle = document.querySelector('link[rel="shortcut icon"]');
    linkEle.href = favicon;
    linkEle.type = '';
    linkEle.type = 'image/x-icon';

    // 设置网页主题
    if(title === undefined || title === null){
      document.title = '\u200E';
    }else{
      document.title = title;
    }

    return (
      <div style={styles.userLogin} className="user-login">
        <div
          style={{
            ...styles.userLoginBg,
            // backgroundImage: `url(${backgroundImage})`,
          }}
        />
        <div style={styles.contentWrapper} className="content-wrapper">
          <h2 style={styles.slogan} className="slogan">
            {/*_intl.get('public.welcome')} <br /> {_intl.get('public.system')*/}
          </h2>
          <div style={styles.formContainer}>
            <div>
              <img src={agentLogo} alt="" style={{width:'244px',height:'50px'}} />
            </div>
            <div style={styles.language}>
                <Balloon
                  trigger={
                    <div>
                    Languages
                      <Icon
                        type="arrow-down-filling"
                        size="xxs"
                        className="icon-down"
                      />
                    </div>
                  }
                  align="rb"
                  closable={false}
                >
                <ul>
                  {
                    lang.map( (item,index)=> {
                      return(
                        <li onClick={this.setLanguage} data-lang={item.code}  className="user-profile-menu-item"  key={index} style={index===lang.length-1?null:styles.marginBottom}>
                          <a href="#" data-lang={item.code} style={{textDecoration:'none'}}>{item.name}</a>
                        </li>
                      )
                    })
                  }
                </ul>
              </Balloon>
            </div>
            <div style={styles.formTitle}>
              <span style={{cursor:'pointer'}} >{_intl.get('login.login')}</span>
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
                      <Checkbox style={styles.checkbox} {...init("checked")} defaultChecked={!!getUserInfo().password}>{_intl.get('login.remember')}</Checkbox>
                    </FormItem>
                  </Col>
                </Row>
                <Row style={styles.formItem}>
                  <Button
                    loading={loading}
                    type="primary"
                    htmlType='submit'
                    style={styles.submitBtn}
                  >
                    {
                      loading?
                        _intl.get('public.loading'):
                        _intl.get('login.login')
                    }
                  </Button>
                </Row>
                <div style={styles.bottomLogin}>
                  <span style={{cursor:'pointer'}} onClick={this.goRegister}>{_intl.get('public.register')}</span>
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

export default connect(mapStateToProps,mapDispatchToProps)(UserLogin)

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
  formTitle: {
    margin: '20px 0 20px',
    textAlign: 'center',
    color: '#3080fe',
    letterSpacing: '3px',
    fontSize:'15px'
  },
  inputIcon: {
    position: 'absolute',
    left: '0px',
    top: '3px',
    color: '#999',
  },
  bottomLogin:{
    margin: '20px 0 0 0',
    color: '#3080fe',
    letterSpacing: '3px',
    fontSize:'14px',
    float:'right'
  },
  submitBtn: {
    width: '244px',
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
  marginBottom:{
    marginBottom:'15px',
  },
};
