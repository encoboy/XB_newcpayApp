import { Feedback ,Dialog} from "@icedesign/base";
import createHistory from 'history/createHashHistory';

const history = createHistory();
const Toast = Feedback.toast;


//api请求通过redux action控制   实现全局loading

export const lang = [
  {name:'简体中文',code:'zh-cn'},
  {name:'English',code:'en-us'},
  {name:'Tiếng việt nam',code:'my-vn'},
  {name:'ภาษาไทย',code:'my-th'}
];

//获取用户信息
export function getUserInfo() {
  return{
    username:localStorage.getItem('ice-username'),
    password:localStorage.getItem('ice-password'),
    lang:localStorage.getItem('ice-lang')
  }
}

//操作权限   没有数据返回默认权限为true
export function hasAction(data,action) {
  return data.hasOwnProperty(action) ? data[action] : true;
}


//空对象 { }
export function isEmptyObject(obj) {
  for(const key in obj){
    return false;//返回false，不为空对象
  }
  return true;//返回true，为空对象
}

//获取地址栏参数，name:参数名称
export function UrlSearch()
{
  let name,value;
  let str=location.href; //取得整个地址栏
  let num=str.indexOf("?");
  str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]

  const arr=str.split("&"); //各个参数放到数组里
  for(let i=0;i < arr.length;i++){
    num=arr[i].indexOf("=");
    if(num>0){
      name=arr[i].substring(0,num);
      value=arr[i].substr(num+1);
      this[name]=value;
    }
  }
}

//接口错误处理
export function errorHanldling(error) {
  const code = error.code?error.code.trim().toLowerCase():null;
  const err = error.error;
  if(err ==="session_expired"){
    Toast.show({
      type: "error",
      content: _intl.get('public.expire'),
      afterClose: () => history.push('/login')
    });
    return;
  };
  
  if(code){
    switch (code){
      case 'session_expired':
        Toast.show({
          type: "error",
          content: _intl.get('public.expire'),
          afterClose: () => history.push('/login')
        });
        return;
      case 'unexpected_error':
      console.log(code);
      return;
      default:
        Dialog.alert({
          className:'error',
          content:_intl.get(`error.${code}`),
          closable: false,
          title:_intl.get('error.null')
    });
    }
  }
}

//catch 捕获异常
export function cathchError(error) {
  switch (error&&error.toString().trim()){
    case 'TypeError: Failed to fetch':
      // Toast.show({
      //   type: "error",
      //   content: _intl.get('error.neterror')
      // });
      console.log('TypeError: Failed to fetch')
      return;
    default:
      // Toast.show({
      //   type: "error",
      //   content: _intl.get('error.unknow')
      // });
      console.log('捕获异常',error);
  }
}
