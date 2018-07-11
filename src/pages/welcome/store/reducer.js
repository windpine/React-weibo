import * as actionTypes from './actionTypes'
import {fromJS} from 'immutable';

const defaultState=fromJS({
    login:{
        username:'',
        password:'',
        rememberMe:false
    },
    register:{
        username:'',
        password:'',
        rePassword:''
    }

});
export default (state=defaultState,action)=>{

    if(action.type===actionTypes.CHANGE_INPUT_USERNAME){
        //immutable对象的set方法内部会处理赋值逻辑
        return state.setIn(['login','username'],action.value);
    }
    if(action.type===actionTypes.CHANGE_INPUT_PASSWORD){
        //immutable对象的set方法内部会处理赋值逻辑
        return state.setIn(['login','password'],action.value);
    }
    if(action.type===actionTypes.SAVE_LOGIN_INFO){
        return state.setIn(['login','username'],action.username)
            .setIn(['login','password'],action.password);

    }
    return state;
}