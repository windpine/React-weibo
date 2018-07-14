import * as actionTypes from './actionTypes'
import {fromJS} from 'immutable';

const defaultState=fromJS({
    login:{
        username:'',
        password:'',
        remember:false
    },
    loginState:false
});
export default (state=defaultState,action)=>{
    if(action.type===actionTypes.SAVE_LOGIN_INFO){
        return state.set('login',state.get('login').merge(action.values))
            .set('loginState',true);
    }
    return state;
}