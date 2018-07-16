import * as actionTypes from './actionTypes'
import {fromJS} from 'immutable';

import axios from 'axios';



var config = {
    baseURL: 'http://localhost:8080'
};

export const saveProfileDataAction=(uid,nickname,username,tweets,follows,followers,avatarUrl,sex,password,email)=>({
    type:actionTypes.SAVE_FORM_DATA,
    value:{
        uid:uid,
        nickname:nickname,
        username:username,
        tweets:tweets,
        follows:follows,
        followers:followers,
        avatarUrl:avatarUrl,
        sex:sex,
        password:password,
        email:email,
    },
})

export const saveProfileRequest=(uid,nickname,username,tweets,follows,followers,avatarUrl,sex,password,email)=>{
    return(dispatch)=>{
        const values={
            uid:uid,
            nickname:nickname,
            username:username,
            tweets:tweets,
            follows:follows,
            followers:followers,
            avatarUrl:avatarUrl,
            sex:sex,
            password:password,
            email:email,
        }
        const myuid=sessionStorage.getItem('uid');
        axios.put("/users"+"/"+myuid,values,config)
            .then(res=>{
                //const userInfo=res.data;
                //console.log("toUpdatePut:",userInfo);

                dispatch(saveProfileDataAction(uid,nickname,username,
                    tweets,follows,followers,avatarUrl,sex,password,
                    email));
            });
    }
}

export const saveFollowListRequest=(result,deleteId)=>{
    return(dispatch)=>{
        const myuid=sessionStorage.getItem('uid');
        axios.delete("/users"+"/"+myuid+"/"+deleteId,config)
            .then(res=>{
                dispatch(changeFollowListAction(result));
            });
    }
}

export const changeFollowListAction=(result)=>({
    type:actionTypes.CHANGE_FOLLOWLIST,
    follows:result,
})

export const changeFollowerListAction=(result)=>({
    type:actionTypes.CHANGE_FOLLOWERLIST,
    followers:result,
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

