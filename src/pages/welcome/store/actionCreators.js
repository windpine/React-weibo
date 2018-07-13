import * as actionTypes from './actionTypes'

export const saveLoginInfo=(values)=>({
    type:actionTypes.SAVE_LOGIN_INFO,
    values
})