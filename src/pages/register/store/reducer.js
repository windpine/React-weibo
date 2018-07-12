import * as actionTypes from './actionTypes'
import {fromJS} from 'immutable';

const defaultState=fromJS({
    register:{
        username:'',
        password:'',
        confirm:'',
        email:'',
        nickname:'',
        captcha:''
    },
    loginState:false,
    confirmDirty:false,
    autoCompleteResult: [],
});
export default (state=defaultState,action)=>{
    if(action.type===actionTypes.SAVE_REGISTER_INFO){
        return state.set('register',state.get('register').merge(action.values))
            .set('loginState',true);
    }
    if(action.type===actionTypes.CONFIRM_BLUR){
        return state.set('confirmDirty',
            state.get('confirmDirty')||!!action.value);
    }
    return state;
}