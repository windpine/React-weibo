import * as actionTypes from './actionTypes'
import {fromJS} from 'immutable';


export const saveProfileDataAction=(nickname,username,sex,email,password)=>({
    type:actionTypes.SAVE_FORM_DATA,
    value:{
        nickname,
        username,
        sex,
        email,
    },
})

export const changeFollowListAction=(result)=>({
    type:actionTypes.CHANGE_FOLLOWLIST,
    follows:fromJS(result),
})

export const changeFollowerListAction=(result)=>({
    type:actionTypes.CHANGE_FOLLOWERLIST,
    followers:fromJS(result),
})

export const savePasswordAction=(password)=>({
    type:actionTypes.CHANGE_PASSWORD,
    password
})

export const changeUserInfoActoin=(result,password)=>({
    type:actionTypes.CHANGE_USERINFO,
    userInfo:result,
    password:password,

})

export const getInputNicknameAction=(nickname)=>({
    type:actionTypes.CHANGE_INPUT_NICKNAME,
    nickname
})

export const getInputUsernameAction=(username)=>({
    type:actionTypes.CHANGE_INPUT_USERNAME,
    username
})

export const getInputSexAction=(sex)=>({
    type:actionTypes.CHANGE_INPUT_SEX,
    sex
})

export const getInputEmailAction=(email)=>({
    type:actionTypes.CHANGE_INPUT_EMAIL,
    email
})

export const changeModalVisible=(value)=>({
    type:actionTypes.CHANGE_MODALVISIBLE,
    value
})

//Todo:getFollowsList()  & getFollowersList()

