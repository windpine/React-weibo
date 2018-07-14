import * as actionTypes from './actionTypes'

export const saveRegisterInfo=(values)=>({
    type:actionTypes.SAVE_REGISTER_INFO,
    values
})

export const confirmBlur=(value)=>({
    type:actionTypes.CONFIRM_BLUR,
    value
})