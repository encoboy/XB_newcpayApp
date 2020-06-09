import {errorHanldling,cathchError} from '../util';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_OPERATION = 'RECEIVE_OPERATION';
export const RESET_OPERATION = 'RESET_OPERATION';
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const RECEIVE_NOTIFY = 'RECEIVE_NOTIFY';
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

export function receiveNotify(notify) {
  return {
    type: RECEIVE_NOTIFY,
    notify
  }
}

export function getStopRedDot(is_redDot){
  return {
    type: STOP_REDDOT,
    is_redDot
  }
} 

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

    let jwt = window.localStorage.getItem('admin_jwt');

    // 修改协议  动态修改url地址
    let protocol = document.location.protocol;
    let pro = process._root.substring(6);
    let url =  protocol+pro+obj.url;

    return  fetch(url, {
      method: obj.type||'post',
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
        window.localStorage.setItem('admin_jwt',data.jwt);
        obj.success&&obj.success(data)
      }else {
        console.log('api error：',data);
        obj.error&&obj.error();
        errorHanldling(data);
      }
    }).catch((error)=>{
      console.log('catch error：',error);
      requestTimes--;
      dispatch(receivePosts(obj));
      obj.error&&obj.error();
      cathchError(error)
    })
  }
};

// 上传图片的请求接口
export function logo_fetch(obj,requiredLoading=true) {

  let protocol = document.location.protocol;
  let pro = process._root.substring(6);
  let url =  protocol+pro+obj.url;


  let jwt = window.localStorage.getItem('admin_jwt');

  let method = obj.method || 'POST';
  let formData = new FormData();
  let keyArray = Object.keys(obj.data);
  let valueArr = Object.values(obj.data);
  for (let i = 0; i < keyArray.length; i++) {
      formData.append(keyArray[i], valueArr[i])
  }
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
    }).then(r => r.json())
      .then((data)=>{
        window.localStorage.setItem('admin_jwt',data.jwt);
        requestTimes--;
        if(!requestTimes){
          dispatch(receivePosts(obj));
        }
        if(data.status === 'ok'){
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
