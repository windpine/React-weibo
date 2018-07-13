import {fromJS} from 'immutable';
import * as actionTypes from "../../profile/store/actionTypes";

const defaultState=fromJS(
    {

        tweets:[],//发表的微博列表
        follows:[{//关注的用户列表
            nickname: 'Edward King 0',
            sex:'女',
            email: 'nicoleynh960111@163.com',
        }, {
            nickname: 'Edward King 0',
            sex:'女',
            email: 'nicoleynh960111@163.com',
        }],

        followers:[],//粉丝列表
        data:{
            nickname:'nicole',//昵称
            username:'杨霓虹',//
            sex:'女',//性别
            email:'nicoleynh@163.com',//邮箱
        },
        password:'123',//密码
        linkKey:'',


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
        case actionTypes.CHANGE_MODALVISIBLE:
            return state.setIn('isModalVisible',action.value);
        default:
            return state;


    }

}