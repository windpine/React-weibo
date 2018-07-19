import * as actionTypes from './actionTypes'
import {fromJS} from 'immutable';

import axios from 'axios';
import {CHANGE_ACTIVEKEY} from "./actionTypes";



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

//todo:添加关注
export const addFollowRequest=(uid)=>{
    const values={
        followId:uid,
        followerId:sessionStorage.getItem('uid'),
    }
    return(dispatch)=>{
        const myuid=sessionStorage.getItem('uid');
        axios.post("/users"+"/"+myuid+"/"+uid,values,config)
            .then(res=>{
                console.log("addFollowValues:",values);
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

export const changeIsFollow=(result)=>({
    type:actionTypes.CHANGE_ISFOLLOW,
    result:result,
})

export const savePasswordAction=(password)=>({
    type:actionTypes.CHANGE_PASSWORD,
    password
})

export const changeUserInfoActoin=(result,password,key)=>({
    type:actionTypes.CHANGE_USERINFO,
    userInfo:result,
    password:password,
    key:key,

})

export const handleProfileFileChange=(file)=>({
    type:actionTypes.HANDLE_PROFILEFILE_CHANGE,
    file
})

export const handleProfilePreview=(file)=>({
    type:actionTypes.HANDLE_PROFILEPREVIEW,
    file
})

export const handleProfilePreviewCancel=()=>({
    type:actionTypes.HANDLE_PROFILEPREVIEW_CANCLE,
})