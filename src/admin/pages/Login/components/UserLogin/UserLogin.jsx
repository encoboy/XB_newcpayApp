/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Button, Checkbox, Grid ,Field,Form,Balloon,Icon} from '@icedesign/base';
import IceIcon from '@icedesign/icon';
import {getUserInfo,lang} from '../../../../util';
import sha1 from 'sha1';
import {connect} from 'react-redux';
import {changeLanguage} from '../../../../redux/action';
import './UserLogin.scss';

const { Row, Col } = Grid;
const FormItem = Form.Item;

// 寻找背景图片可以从 https://unsplash.com/ 寻找
const backgroundImage =
'https://images.unsplash.com/photo-1521540124319-66c09f0d5999?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjF9&s=3e32043956edd2307a4dab0e78b5ec21&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb'

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
    };
  }
  componentDidMount(){
    const user = getUserInfo();
    this.field.setValues({
      username:user.password&&user.username||undefined,
      password:user.password||undefined,
      checked:!!user.password
    });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.field.validate((errors, values) => {
      if (!errors) {
        this.setState({loading:true});
        _fetch({
          url:'/Manager/Login',
          data:{
            method:'dologin',
            username:values.username.toLowerCase(),
            password:sha1(values.username.toLowerCase()+values.password)
          },
          success:(data)=>{
            if(values.checked){
              localStorage.setItem('admin-password',values.password);
            }else {
              // localStorage.removeItem('ice-username');
              localStorage.removeItem('admin-password');
            }
            localStorage.setItem('admin-username',values.username);
            window.localStorage.setItem('admin_jwt',data.jwt);
            // const {language} = this.state;
            // this.props.setLanguage(language[data.lang]||'zh-cn');
            this.props.history.push('/merchant');
          },
          error:()=>{
            this.setState({loading:false});
          }
        });
      }
    });
  };

  setLanguage = (e) => {
    e.preventDefault();
    const lang = e.target.getAttribute('data-lang');
    this.props.setLanguage(lang);
  };

  render() {
    const {loading} = this.state;
    // const {language,setLanguage} = this.props;
    const init = this.field.init;
    return (
      <div style={styles.userLogin} className="user-login">
        <div
          style={{
            ...styles.userLoginBg,
            backgroundImage: `url(${backgroundImage})`,
          }}
        />
        <div style={styles.contentWrapper} className="content-wrapper">
          <h2 style={styles.slogan} className="slogan">
            {_intl.get('public.welcome')} <br /> {_intl.get('public.system')}
          </h2>
          <div style={styles.formContainer}>
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
            <h4 style={styles.formTitle}> {_intl.get('login.login')}</h4>
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
    margin: '0 0 20px',
    textAlign: 'center',
    color: '#3080fe',
    letterSpacing: '12px',
  },
  inputIcon: {
    position: 'absolute',
    left: '0px',
    top: '3px',
    color: '#999',
  },
  submitBtn: {
    width: '240px',
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
  }
};
