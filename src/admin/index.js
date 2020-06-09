import ReactDOM from 'react-dom';
// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
import '@icedesign/base/reset.scss';
import './index.scss'
import App from './router';
import reducer from './redux/reducer';
import thunk from 'redux-thunk'
import { Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';

// import {ConfigProvider} from '@alifd/next';

const store = createStore(reducer,applyMiddleware(thunk));

const ICE_CONTAINER = document.getElementById('ice-container');
if (!ICE_CONTAINER) {
  throw new Error('当前页面不存在 <div id="ice-container"></div> 节点.');
}

ReactDOM.render(
  <Provider store={store}>
      <App/>
  </Provider>
  ,
  ICE_CONTAINER
);
