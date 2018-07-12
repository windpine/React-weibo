import * as actionTypes from './actionTypes'

export const getInputUsernameAction=(value)=>({
    type: actionTypes.CHANGE_INPUT_USERNAME,
    value
})
export const getInputPasswordAction=(value)=>({
    type: actionTypes.CHANGE_INPUT_PASSWORD,
    value
})
export const saveLoginInfo=(username,password)=>({
    type:actionTypes.SAVE_LOGIN_INFO,
    username,
    password
})