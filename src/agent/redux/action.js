import {errorHanldling,cathchError,existusername} from '../util'

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const RECEIVE_NOTIFY = 'RECEIVE_NOTIFY';
export const RECEIVE_OPERATION = 'RECEIVE_OPERATION';
export const RESET_OPERATION = 'RESET_OPERATION';
export const STOP_REDDOT = 'STOP_REDDOT';
export const ACTIVE_REDDOT = 'ACTIVE_REDDOT';

export function changeLanguage(language) {
  return{
    type:CHANGE_LANGUAGE,
    language
  }
}
export function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}
export function receivePosts(subreddit) {
  return {
    type: RECEIVE_POSTS,
    subreddit
  }
}
export function receiveNotify(notify) {
  return {
    type: RECEIVE_NOTIFY,
    notify
  }
}

export function receiveOperation(operation) {
  return {
    type: RECEIVE_OPERATION,
    operation
  }
}

export function resetOperation(operation) {
  return {
    type: RESET_OPERATION,
    operation
  }
}
// 停止红点
export function getStopRedDot(is_redDot){
  return {
    type: STOP_REDDOT,
    is_redDot
  }
} 
// 激活红点
export function getActiveRedDot(is_redDot){
  return {
    type: ACTIVE_REDDOT,
    is_redDot
  }
} 

let requestTimes = 0;   //请求发起次数

export function fetchPosts(obj,requiredLoading=true) {

  // Thunk middleware 知道如何处理函数。
  // 这里把 dispatch 方法通过参数的形式传给函数，
  // 以此来让它自己也能 dispatch action。

  return function (dispatch) {

    // 首次 dispatch：更新应用的 state 来通知
    // API 请求发起了。
    if(requiredLoading){
      dispatch(requestPosts(obj))
    }

    requestTimes++;

    // 获取网页的协议
    let protocol = document.location.protocol;
    let pro = process._root.substring(6);

    // 动态修改url，动态获取location.host 修改；
    let url;

    if( process.dynamic || window.dynamic){
      let host = document.location.host;
      let hostSliceNumber = host.indexOf('.');
      let lastHostPart = host.slice(hostSliceNumber);
      let needChangeHostPart = host.slice(0,hostSliceNumber);
      let changedHostPart = needChangeHostPart + "api";
      let myHost = changedHostPart+lastHostPart;
      url = protocol + '//' + myHost + "/index.php" + obj.url;
    }else{
      url = protocol+pro+obj.url;
    }

    // 获取jwt，防止操作时会出现超时退出
    // let jwt = window.localStorage.getItem('agent_jwt')?window.localStorage.getItem('agent_jwt'):null;
    let jwt;
    if(window.localStorage.getItem('agent_jwt')==undefined){
      console.log('this undefined is true');
      jwt = undefined;
    }else if(window.localStorage.getItem('agent_jwt')=='undefined'){
      console.log('this undefined is string')
      jwt = undefined;
    }else{
      jwt = window.localStorage.getItem('agent_jwt');
    }
    return  fetch(url, {
      method: obj.type||'post',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(Object.assign({},{jwt},obj.data))
    }).then((response) => {
      return response.json();
    }).then((data)=>{
      requestTimes--;
      if(!requestTimes){
        dispatch(receivePosts(obj));
      }
      if(data.status === 'ok'){
        window.localStorage.setItem('agent_jwt',data.jwt);
        obj.success&&obj.success(data)
      }else{
        console.log('api error：',data);
        obj.error&&obj.error();
        errorHanldling(data)
      }
    }).catch((error)=>{
      console.log('catch error：',error);
      requestTimes--;
      dispatch(receivePosts(obj));
      obj.error&&obj.error();
      cathchError(error,obj.error)
    })
  }
}


// 上传图片的请求接口
export function logo_fetch(obj,requiredLoading=true) {

  let protocol = document.location.protocol;
  let pro = process._root.substring(6);

  // 动态修改url，动态获取location.host 修改；
  let url;
  // process.dynamic || window.dynamic
  if(false){
    let host = document.location.host;
    // host = "ncpayapp.syncbug.com";
    let hostSliceNumber = host.indexOf('.');
    let lastHostPart = host.slice(hostSliceNumber);
    let needChangeHostPart = host.slice(0,hostSliceNumber);
    let changedHostPart = needChangeHostPart + "api";
    let myHost = changedHostPart+lastHostPart;
    url = protocol + '//' + myHost + "/index.php" + obj.url;
  }else{
    url = protocol+pro+obj.url;
  }


  let jwt;
  if(window.localStorage.getItem('agent_jwt')==undefined){
    console.log('this undefined is true');
    jwt = undefined;
  }else if(window.localStorage.getItem('agent_jwt')=='undefined'){
    console.log('this undefined is string')
    jwt = undefined;
  }else{
    jwt = window.localStorage.getItem('agent_jwt')
  }


  let method = obj.method || 'POST';
  let formData = new FormData();
  let keyArray = Object.keys(obj.data);
  let valueArr = Object.values(obj.data);
  for (let i = 0; i < keyArray.length; i++) {
      formData.append(keyArray[i], valueArr[i])
  };
  formData.append('jwt',jwt);
  return function (dispatch) {
    if(requiredLoading){
      dispatch(requestPosts(obj))
    }
    requestTimes++;
    return fetch(url, {
      method: method,
      mode: 'cors',
      credentials: 'include',
      body: formData
    }).then(
        r => r.json()
      ).then((data)=>{
        requestTimes--;
        if(!requestTimes){
          dispatch(receivePosts(obj));
        }
        if(data.status === 'ok'){
          window.localStorage.setItem('agent_jwt',data.jwt);
          obj.success&&obj.success(data)
        }else{
          console.log('api error：',data);
          obj.error&&obj.error();
          errorHanldling(data)
        }
      }).catch((error)=>{
        console.log('catch error：',error);
        requestTimes--;
        dispatch(receivePosts(obj));
        obj.error&&obj.error();
        cathchError(error,obj.error)
      })
    }
}
