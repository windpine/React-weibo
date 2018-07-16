import * as actionTypes from './actionTypes'
import axios from 'axios';
import {saveSuccessInfo} from "../../welcome/store/actionCreators";

var config = {
    baseURL: 'http://localhost:8080'
};

export const saveRegisterInfo=(values)=>({
    type:actionTypes.SAVE_REGISTER_INFO,
    values
})

export const confirmBlur=(value)=>({
    type:actionTypes.CONFIRM_BLUR,
    value
})

export const registerRequest=(values)=>{
    return (dispatch)=>{
        axios.post('/register',values,config)
            .then(res=>{
                console.log(res.data)
                dispatch(saveRegisterInfo(res.data.data))
            })
    }
}

export const handleFileChange=(file)=>({
    type:actionTypes.HANDLE_FILE_CHANGE,
    file
})

export const handlePreview=(file)=>({
    type:actionTypes.HANDLE_PREVIEW,
    file
})

export const handlePreviewCancle=()=>({
    type:actionTypes.HANDLE_PREVIEW_CANCLE,
})