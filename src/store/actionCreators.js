import {CHANGE_INPUT_VALUE} from './actionTypes'

export const getInputValueAction=(value)=>({
        type: CHANGE_INPUT_VALUE,
        value
})