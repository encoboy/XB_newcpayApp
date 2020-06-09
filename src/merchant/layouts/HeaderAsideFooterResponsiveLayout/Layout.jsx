/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, { Component } from 'react';
import cx from 'classnames';
import Layout from '@icedesign/layout';
import { Icon,Loading } from '@icedesign/base';
import Menu, { SubMenu, Item as MenuItem } from '@icedesign/menu';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import FoundationSymbol from 'foundation-symbol';
import { connect } from 'react-redux'
import {receiveOperation} from '../../redux/action'
import { enquire } from 'enquire-js';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Logo from '../../components/Logo';
import { asideMenuConfig } from './../../menuConfig';
import {isEmptyObject} from '../../util'
import './scss/light.scss';
import './scss/dark.scss';

// 设置默认的皮肤配置，支持 dark 和 light 两套皮肤配置
const theme = typeof THEME === 'undefined' ? 'dark' : THEME;
@withRouter
class HeaderAsideFooterResponsiveLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    const openKeys = this.getOpenKeys();
    this.state = {
      collapse: false,
      openDrawer: false,
      pageoperate: {},
      subOperation: {},
      isScreen: undefined,
      openKeys,
    };
    this.openKeysCache = openKeys;
  }

  componentDidMount() {
    this.enquireScreenRegister();
    this.getData();
    this.time = setInterval(()=>{
      this.getProfile()
    },60000)
  }
  componentWillUnmount(){
    clearInterval(this.time);
  }
  getData=()=>{
    const {page} = this.props;
    if(isEmptyObject(page)){//防止侧边栏闪烁
      _fetch({
        url:'/User/Profile',
        data:{
          method:'getoperation',
        },
        success:(data)=>{
          const subOperation = this.filterOperation(data.pageoperate||{});
          this.setState({
            pageoperate:data.pageoperate,
            subOperation
          });
          this.props.setOperation({
            btn:data.buttonoperate||{},
            page:{...data.pageoperate,...subOperation}||{}
          })
        }
      })
    }else {
      this.setState({
        pageoperate:page,
        subOperation:this.filterOperation(page||{})
      });
    }

  };
  filterOperation = (operation) => {
    let data = {};
    for (let key in operation) {
      let pre_key = key.split('_')[0];
      let value = operation[key];
      if (data.hasOwnProperty(pre_key)) {
        data[pre_key] = data[pre_key] || value;
      } else {
        data[pre_key] = value;
      }
      // console.log(value);
    }
    return data
  };
  getProfile = () => {
    _fetch({
      url:'/User/Profile',
      data:{
        method:'userinfo',
      },
      error:()=>{
        clearInterval(this.time)
      }
    },false)
  };
  /**
   * 注册监听屏幕的变化，可根据不同分辨率做对应的处理
   */
  enquireScreenRegister = () => {
    const isMobile = 'screen and (max-width: 720px)';
    const isTablet = 'screen and (min-width: 721px) and (max-width: 1199px)';
    const isDesktop = 'screen and (min-width: 1200px)';

    enquire.register(isMobile, this.enquireScreenHandle('isMobile'));
    enquire.register(isTablet, this.enquireScreenHandle('isTablet'));
    enquire.register(isDesktop, this.enquireScreenHandle('isDesktop'));
  };

  enquireScreenHandle = (type) => {
    let collapse;
    if (type === 'isMobile') {
      collapse = false;
    } else if (type === 'isTablet') {
      collapse = true;
    } else {
      collapse = this.state.collapse;
    }

    const handler = {
      match: () => {
        this.setState({
          isScreen: type,
          collapse,
        });
      },
      unmatch: () => {
        // handler unmatched
      },
    };

    return handler;
  };

  toggleCollapse = () => {
    const { collapse } = this.state;
    const openKeys = !collapse ? [] : this.openKeysCache;

    this.setState({
      collapse: !collapse,
      openKeys,
    });
  };

  /**
   * 左侧菜单收缩切换
   */
  toggleMenu = () => {
    const { openDrawer } = this.state;
    this.setState({
      openDrawer: !openDrawer,
    });
  };

  /**
   * 当前展开的菜单项
   */
  onOpenChange = (openKeys) => {
    this.setState({
      openKeys,
    });
    this.openKeysCache = openKeys;
  };

  /**
   * 响应式时点击菜单进行切换
   */
  onMenuClick = () => {
    this.toggleMenu();
  };

  /**
   * 获取当前展开的菜单项
   */
  getOpenKeys = () => {
    const { match } = this.props;
    const matched = match.path;
    let openKeys = [];

    Array.isArray(asideMenuConfig) &&
      asideMenuConfig.forEach((item, index) => {
        if (matched.startsWith(item.path)) {
          openKeys = [`${index}`];
        }
      });

    return openKeys;
  };

  render() {
    const { location,history ,loading} = this.props;
    const { pageoperate,subOperation } = this.state;
    const { pathname } = location;
    return (
      <Layout
        style={{ minHeight: '100vh' }}
        className={cx(
          `ice-design-header-aside-footer-responsive-layout-${theme}`,
          {
            'ice-design-layout': true,
          }
        )}
      >
        <Header
          theme={theme}
          history={history}
          isMobile={this.state.isScreen !== 'isDesktop' ? true : undefined}
        />
        <Layout.Section>
          {this.state.isScreen === 'isMobile' && (
            <a className="menu-btn" onClick={this.toggleMenu}>
              <Icon type="category" size="small" />
            </a>
          )}
          {this.state.openDrawer && (
            <div className="open-drawer-bg" onClick={this.toggleMenu} />
          )}
          <Layout.Aside
            width="auto"
            theme={theme}
            className={cx('ice-design-layout-aside', {
              'open-drawer': this.state.openDrawer,
            })}
          >
            {/* 侧边菜单项 begin */}
            {this.state.isScreen !== 'isMobile' && (
              <a className="collapse-btn" onClick={this.toggleCollapse}>
                <Icon
                  type={this.state.collapse ? 'arrow-right' : 'arrow-left'}
                  size="small"
                />
              </a>
            )}
            {this.state.isScreen === 'isMobile' && <Logo />}
            <Menu
              style={{ width: this.state.collapse ? 60 : 200 }}
              inlineCollapsed={this.state.collapse}
              mode="inline"
              selectedKeys={[pathname]}
              openKeys={this.state.openKeys}
              defaultSelectedKeys={[pathname]}
              onOpenChange={this.onOpenChange}
              onClick={this.onMenuClick}
            >
              {Array.isArray(asideMenuConfig) &&
              asideMenuConfig.length > 0 &&
              asideMenuConfig.map((nav, index) => {
                if (nav.children && nav.children.length > 0 && subOperation[nav.operation]) {
                  return (
                    <SubMenu
                      key={index}
                      title={
                        <span>
                            {nav.icon ? (
                              <FoundationSymbol size="small" type={nav.icon} />
                            ) : null}
                          <span className="ice-menu-collapse-hide">
                              {nav.name()}
                            </span>
                          </span>
                      }
                    >
                      {nav.children.map((item) => {
                        const linkProps = {};
                        if (item.newWindow) {
                          linkProps.href = item.path;
                          linkProps.target = '_blank';
                        } else if (item.external) {
                          linkProps.href = item.path;
                        } else {
                          linkProps.to = item.path;
                        }
                       if(pageoperate[item.operation]){
                         return (
                           <MenuItem key={item.path}>
                             <Link {...linkProps}>{item.name()}</Link>
                           </MenuItem>
                         );
                       }
                      })}
                    </SubMenu>
                  );
                }
                const linkProps = {};
                if (nav.newWindow) {
                  linkProps.href = nav.path;
                  linkProps.target = '_blank';
                } else if (nav.external) {
                  linkProps.href = nav.path;
                } else {
                  linkProps.to = nav.path;
                }
               if(subOperation[nav.operation]){
                 return (
                   <MenuItem key={nav.path}>
                     <Link {...linkProps}>
                        <span>
                          {nav.icon ? (
                            <FoundationSymbol size="small" type={nav.icon} />
                          ) : null}
                          <span className="ice-menu-collapse-hide">
                            {nav.name()}
                          </span>
                        </span>
                     </Link>
                   </MenuItem>
                 );
               }
              })}
            </Menu>
            {/* 侧边菜单项 end */}
          </Layout.Aside>
          {/* 主体内容 */}
          <Layout.Main>
            <Loading visible={loading} shape="fusion-reactor" color="#1861D5 " style={{display:'block'}} tip={_intl.get('public.loading')}>
              {this.props.children}
            </Loading>
          </Layout.Main>
        </Layout.Section>
        <Footer />
      </Layout>
    );
  }
}

function mapStateToProps(state){
  return {
    loading : state.isFetching,
    page: state.operation.page
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setOperation:(operation)=>dispatch(receiveOperation(operation)),
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(HeaderAsideFooterResponsiveLayout)
