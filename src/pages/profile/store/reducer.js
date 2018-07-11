import {fromJS} from 'immutable';
import * as actionTypes from "../../profile/store/actionTypes";

const defaultState=fromJS(
    {

        tweets:[],//发表的微博列表
        follows:[],//关注的用户列表
        followers:[],//粉丝列表
        data:{
            nickname:'',//昵称
            username:'',//
            sex:'',//性别
            email:'',//邮箱
        },
        password:'',//密码

    }
);

export default (state=defaultState,action)=>{
    switch(action.type) {
        case actionTypes.CHANGE_INPUT_VALUE:
            //immutable对象的set方法内部会处理赋值逻辑
            return state.set('nickname', action.value);
        case actionTypes.SAVE_FORM_DATA:
            return state.set('data', action.value);
        case actionTypes.CHANGE_PASSWORD:
            return state.set('password',action.value);
        default:
            return state;
    }

}