import * as actionTypes from './actionTypes'
import {fromJS} from 'immutable';

const defaultState=fromJS({
    login:{
        username:'',
        password:'',
        remember:false
    },
    uid:'',
    loginState:sessionStorage.getItem('uid')?true:false,
    sessionUid:''
});
export default (state=defaultState,action)=>{
    if(action.type===actionTypes.SAVE_LOGIN_INFO){
        return state.set('login',state.get('login').merge(action.values));
    }
    if(action.type===actionTypes.SAVE_SUCCESS_INFO){
        const uid= fromJS(action.value);
        sessionStorage.setItem('uid',uid.get('uid'));
        console.log(typeof sessionStorage.getItem('uid'))
        sessionStorage.setItem('username',state.getIn(['login','username']));
        return state.set('uid',uid.get('uid')).set('loginState',true)
            .set('sessionUid',sessionStorage.getItem('uid'))
    }
    if(action.type===actionTypes.HANDLE_LOGOUT_STATE){
        sessionStorage.removeItem('uid');
        sessionStorage.removeItem('username');
        return state.set('uid','').set('loginState',false);
    }
    return state;
}