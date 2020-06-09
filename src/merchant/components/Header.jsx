import React, { PureComponent } from 'react';
import { Balloon, Icon } from '@icedesign/base';
import IceImg from '@icedesign/img';
import Layout from '@icedesign/layout';
import Menu from '@icedesign/menu';
import FoundationSymbol from 'foundation-symbol';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { headerMenuConfig } from './../menuConfig';
import {getUserInfo,lang} from '../util/index'
import {connect} from 'react-redux';
import {changeLanguage,resetOperation} from '../redux/action'
import intl from 'react-intl-universal'
import Logo from './Logo';



class Header extends PureComponent {

  logOut = (e) => {
    e.preventDefault();
    _fetch({
      url:'/User/Login',
      data:{
        method:'dologout'
      },
      success:()=>{
        this.props.resetOperation();
        this.props.history.push('/login')
      }
    })
  };
  setLanguage = (e) => {
    e.preventDefault();
    const lang = e.target.getAttribute('data-lang');
    this.props.setLanguage(lang);
  };
  render() {
    const { width, theme, isMobile, className, style } = this.props;
    return (
      <Layout.Header
        theme={theme}
        className={cx('ice-design-layout-header', className)}
        style={{ ...style, width }}
      >
        <Logo />
        <div
          className="ice-design-layout-header-menu"
          style={{ display: 'flex' }}
        >
          {/* Header 菜单项 begin */}
          <Menu mode="horizontal" selectedKeys={[]}>
            {headerMenuConfig && headerMenuConfig.length > 0 ? (
              headerMenuConfig.map((nav, idx) => {
                const linkProps = {};
                if (nav.newWindow) {
                  linkProps.href = nav.to;
                  linkProps.target = '_blank';
                } else if (nav.external) {
                  linkProps.href = nav.to;
                } else {
                  linkProps.to = nav.to;
                }
                return (
                  <Menu.Item key={idx}>
                    {linkProps.to ? (
                      <Link {...linkProps}>
                        {nav.icon ? (
                          <FoundationSymbol type={nav.icon} size="small" />
                        ) : null}
                        {!isMobile ? nav.name : null}
                      </Link>
                    ) : (
                      <a {...linkProps}>
                        {nav.icon ? (
                          <FoundationSymbol type={nav.icon} size="small" />
                        ) : null}
                        {!isMobile ? nav.name : null}
                      </a>
                    )}
                  </Menu.Item>
                );
              })
            ) : null}
            <Menu.Item>
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
                closable={false}
              >
                <ul>
                  {
                    lang.map( (item,index)=> {
                      return(
                        <li onClick={this.setLanguage} data-lang={item.code} className="user-profile-menu-item" key={index} style={index===lang.length-1?null:styles.marginBottom}>
                          <a href="#" data-lang={item.code} style={{textDecoration:'none'}}>{item.name}</a>
                        </li>
                      )
                    })
                  }
                </ul>
              </Balloon>
            </Menu.Item>
          </Menu>

          {/* Header 菜单项 end */}

          {/* Header 右侧内容块 */}

          <Balloon
            visible={false}
            trigger={
              <div
                className="ice-design-header-userpannel"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: 12,
                }}
              >
                <IceImg
                  height={40}
                  width={40}
                  src="https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png"
                  className="user-avatar"
                />
                <div className="user-profile">
                  <span className="user-name" style={{ fontSize: '13px' }}>
                    {getUserInfo().username&&getUserInfo().username.toUpperCase()}
                  </span>
                  <br />
                  <span
                    className="user-department"
                    style={{ fontSize: '12px' }}
                  >
                    <a onClick={this.logOut}>{intl.get('header.logout')}</a>
                  </span>
                </div>
                <Icon
                  type="arrow-down-filling"
                  size="xxs"
                  className="icon-down"
                />
              </div>
            }
            closable={false}
            className="user-profile-menu"
          >
            {/*<ul>*/}
            {/*<li className="user-profile-menu-item">*/}
            {/*<Link to="/user/info">*/}
            {/*<FoundationSymbol type="person" size="small" />我的主页*/}
            {/*</Link>*/}
            {/*</li>*/}
            {/*/!*<li className="user-profile-menu-item">*!/*/}
            {/*/!*<Link to="/">*!/*/}
            {/*/!*<FoundationSymbol type="repair" size="small" />设置*!/*/}
            {/*/!*</Link>*!/*/}
            {/*/!*</li>*!/*/}
            {/*<li className="user-profile-menu-item">*/}
            {/*<a href='#' onClick={this.logOut}>*/}
            {/*<FoundationSymbol type="compass" size="small" />{intl.get('header.logout')}*/}
            {/*</a>*/}
            {/*</li>*/}
            {/*</ul>*/}
          </Balloon>
        </div>
      </Layout.Header>
    );
  }
}

const mapStateToProps = (state,props) => {
  return {
    language:state.language,
  }
};
const mapDispatchToProps = dispatch => {
  return {
    setLanguage:(language)=>dispatch(changeLanguage(language)),
    resetOperation:(operation)=>dispatch(resetOperation(operation)),
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(Header)

const styles = {
  marginBottom:{
    marginBottom:'15px',
  }
};

