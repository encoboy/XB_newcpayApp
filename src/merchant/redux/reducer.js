import { combineReducers } from 'redux';
import {RECEIVE_POSTS,REQUEST_POSTS,CHANGE_LANGUAGE,RECEIVE_OPERATION,RESET_OPERATION} from './action'
import {getUserInfo} from '../util'

const lang = getUserInfo().lang;

export const language = (state = lang||'zh-cn',action)=>{
  switch (action.type){
    case CHANGE_LANGUAGE:
      return action.language;
    default:
      return state
  }
};

export const isFetching = (state = false,action)=>{
    switch (action.type){
        case REQUEST_POSTS:
            return true;
      case RECEIVE_POSTS:
        return false;
        default :
            return state;
    }
};

export const operation = (state = {
  btn:{},
  page:{}
},action)=>{
  switch (action.type){
    case RECEIVE_OPERATION:
      return Object.assign({},state,{...action.operation});
    case RESET_OPERATION:
      return Object.assign({},state,{btn:{},page:{}});
    default :
      return state;
  }
};

export default combineReducers({
  isFetching:isFetching,
  language,
  operation
});
