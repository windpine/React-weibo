import * as actionTypes from './actionTypes'
import {fromJS} from 'immutable';
import axios from 'axios';


var config = {
    baseURL: 'http://localhost:8080'
};

export const saveProfileDataAction=(uid,nickname,username,sex,email,password)=>({
    type:actionTypes.SAVE_FORM_DATA,
    value:{
        uid,
        nickname,
        username,
        sex,
        email,
        password,
    },
})

export const saveProfileRequest=(values)=>{
    return(dispatch)=>{
        const uid=values.get('uid');
        //todo:post地址以及res.data
        axios.post('`http://localhost:8080/users/${uid}`',values,config)
            .then(res=>{
                console.log(res.data)
                dispatch(saveProfileDataAction(res.data.data))
            });
    }
}

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

