import * as actionTypes from './actionTypes'

export const getInputValueAction=(value)=>({
    type: actionTypes.CHANGE_INPUT_VALUE,
    value
})