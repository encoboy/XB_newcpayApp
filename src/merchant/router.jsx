/**
 * 定义应用路
 */
import { HashRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import React from 'react';
import {fetchPosts} from './redux/action';
import {connect} from 'react-redux';
import intl from 'react-intl-universal';
import routerConfig from './routerConfig';
import {LocaleProvider} from '@icedesign/base'
// import NoOperation from './pages/NoOperation'


const locales = {
  "en-us": require('./i18n/en.json'),
  "zh-cn": require('./i18n/zh.json'),
  "my-vn": require('./i18n/vn.json'),
  "my-th": require('./i18n/th.json'),
};


const NoOperation = ()=> null;

/**
 * 将路由信息扁平化，继承上一级路由的 path
 * @param {Array} config 路由配置
 */
function recursiveRouterConfigV4(config = [],operation = {}) {
  // console.log(operation)
  // console.log(new Date(),operation)
  const routeMap = [];
  config.forEach((item,index) => {
    // console.log(item)
    // const arr = [];
    // arr.push({name:index,child:})
    const hasOperation = item.operation?operation[item.operation]:true;
    const route = {
      path: item.path,
      layout: item.layout,
      component: hasOperation?item.component:NoOperation,
      // component:item.component,
    };
    if (Array.isArray(item.children)) {
      route.childRoutes = recursiveRouterConfigV4(item.children,operation);
    }
    routeMap.push(route);
  });
  return routeMap;
}

/**
 * 将扁平化后的路由信息生成 Route 节点
 *
 * @param {Element} container 路由容器
 * @param {object} router 路由对象
 * @param {string} contextPath 上层路由地址
 * @return {Route}
 * @example
 * <Switch>
 *   <Route exact path="/" component={Home} />
 *   <Route exact path="/page3" component={Page3} />
 *   <Route exact path="/page4" component={Page4} />
 *   <Route exact path="/page3/:id" component={Page3} />
 *   <Route exact component={NotFound} />
 * </Switch>
 */
function renderRouterConfigV4(container, router, contextPath) {
  const routeChildren = [];
  const renderRoute = (routeContainer, routeItem, routeContextPath) => {
    let routePath;
    if (!routeItem.path) {
      // eslint-disable-next-line
      console.error('route must has `path`');
    } else if (routeItem.path === '/' || routeItem.path === '*') {
      routePath = routeItem.path;
    } else {
      routePath = `/${routeContextPath}/${routeItem.path}`.replace(/\/+/g, '/');
    }

    // 优先使用当前定义的 layout
    if (routeItem.layout && routeItem.component) {
      routeChildren.push(
        <Route
          key={routePath}
          exact
          path={routePath}
          render={(props) => {
            return React.createElement(
              routeItem.layout,
              props,
              React.createElement(routeItem.component, props)
            );
          }}
        />
      );
    } else if (routeContainer && routeItem.component) {
      // 使用上层节点作为 container
      routeChildren.push(
        <Route
          key={routePath}
          exact
          path={routePath}
          render={(props) => {
            return React.createElement(
              routeContainer,
              props,
              React.createElement(routeItem.component, props)
            );
          }}
        />
      );
    } else {
      routeChildren.push(
        <Route
          key={routePath}
          exact
          path={routePath}
          component={routeItem.component}
        />
      );
    }

    // 存在子路由，递归当前路径，并添加到路由中
    if (Array.isArray(routeItem.childRoutes)) {
      routeItem.childRoutes.forEach((r) => {
        // 递归传递当前 route.component 作为子节点的 container
        renderRoute(routeItem.component, r, routePath);
      });
    }
  };

  router.forEach((r) => {
    renderRoute(container, r, contextPath);
  });

  return <Switch>{routeChildren}</Switch>;
}

const routerWithReactRouter4 =(operation)=> recursiveRouterConfigV4(routerConfig,operation);
const routeChildren =(operation)=> renderRouterConfigV4(null, routerWithReactRouter4(operation), '/');

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      initDone: false,
    };
    window._fetch = this.props._fetch;
    window._intl = intl;
  }
  componentDidMount() {
    this.loadLocales(this.props.language);
  }
  componentWillReceiveProps(nextProps){
    this.loadLocales(nextProps.language)
  }
  loadLocales(language) {
    localStorage.setItem('ice-lang',language);
    LocaleProvider.set(language);
    intl.init({
      currentLocale: language, // TODO: determine locale here
      locales,
    }).then(() => {
      this.setState({initDone: true});
    });
  }
  render(){
    // console.log(this.props.page,2)
    return(
      this.state.initDone&&
        <Router>{routeChildren(this.props.page)}</Router>
    )
  }
}

const mapStateToProps = (state,props) => {
  return {
    language:state.language,
    page:state.operation.page
  }
};
const mapDispatchToProps = dispatch => {
  return {
    _fetch:(obj,loading)=>dispatch(fetchPosts(obj,loading)),
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(App);
