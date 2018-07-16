import {fromJS} from 'immutable';
import * as actionTypes from "../../profile/store/actionTypes";

const defaultState=fromJS(
    {

        tweets:[],//发表的微博列表
        follows:[],

        followers:[],//粉丝列表
        data:{
            //uid:'',//用户id
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
        case actionTypes.SAVE_FORM_DATA:
            return state.setIn(['data','nickname'], action.value['nickname'])
                .setIn(['data','username'], action.value['username'])
                .setIn(['data','sex'], action.value['sex'])
                .setIn(['data','email'], action.value['email'])
        case actionTypes.CHANGE_PASSWORD:
            return state.set('password',action.password);
        case actionTypes.CHANGE_INPUT_NICKNAME:
            return state.setIn(['data','nickname'],action.nickname);
        case actionTypes.CHANGE_INPUT_USERNAME:
            return state.setIn(['data','username'],action.username);
        case actionTypes.CHANGE_INPUT_SEX:
            return state.setIn(['data','sex'],action.sex);
        case actionTypes.CHANGE_INPUT_EMAIL:
            return state.setIn(['data','email'],action.email);
        case actionTypes.CHANGE_FOLLOWLIST:
            return state.set('follows',action.follows);
        case actionTypes.CHANGE_FOLLOWERLIST:
            return state.set('followers',action.followers);
        case actionTypes.CHANGE_USERINFO:
            return state.setIn(['data','nickname'], action.userInfo['nickname'])
                .setIn(['data','username'], action.userInfo['username'])
                .setIn(['data','sex'], action.userInfo['sex'])
                .setIn(['data','email'], action.userInfo['email'])
                .set('password',action.password)

        default:
            return state;


    }

}