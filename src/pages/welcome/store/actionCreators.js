import * as actionTypes from './actionTypes';
import axios from 'axios';

var config = {
    baseURL: 'http://localhost:8080'
};

export const saveLoginInfo=(values)=>({
    type:actionTypes.SAVE_LOGIN_INFO,
    values
})

export const saveSuccessInfo=(value)=>({
    type:actionTypes.SAVE_SUCCESS_INFO,
    value
})

export const handleLogoutState=()=>({
    type:actionTypes.HANDLE_LOGOUT_STATE
})

export const loginRequest=(values)=>{
    return (dispatch)=>{
        axios.post('/login',values,config)
            .then(res=>{
                const action = saveSuccessInfo(res.data.data);
                dispatch(action)
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