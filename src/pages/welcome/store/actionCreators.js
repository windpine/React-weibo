import * as actionTypes from './actionTypes';
import axios from 'axios';

var config = {
    baseURL: 'http://localhost:8080'
};

export const saveLoginInfo=(values)=>({
    type:actionTypes.SAVE_LOGIN_INFO,
    values
})

export const saveSuccessInfo=(value,avatarUrl)=>({
    type:actionTypes.SAVE_SUCCESS_INFO,
    value:value,
    avatarUrl:avatarUrl
})

export const handleLogoutState=()=>({
    type:actionTypes.HANDLE_LOGOUT_STATE
})

export const loginRequest=(values)=>{
    return (dispatch)=>{

        axios.post('/login',values,config)
            .then(res=>{
                console.log("uid:",res.data.data.uid);
                const uid=res.data.data.uid;
                axios.get("/users"+"/"+res.data.data.uid,config)
                    .then(res=>{
                        const avatarUrl=res.data.data.user.avatarUrl;
                        dispatch(saveSuccessInfo(uid,avatarUrl));
                    })

            })
            .catch(error => {
                alert(error.response.data.msg)
            })
    }
}

export const logoutRequest=()=>{
    return (dispatch)=>{
        axios.post('/logout',null,config)
            .then(res=>{
                if(res.data.status==='success'){
                    dispatch(handleLogoutState());
                }
            })
    }
}