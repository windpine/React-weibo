import * as actionTypes from './actionTypes'
import {fromJS} from 'immutable';

const defaultState=fromJS({
    inputValue:'',
    list:[]
});
export default (state=defaultState,action)=>{

    if(action.type===actionTypes.CHANGE_INPUT_VALUE){
        //immutable对象的set方法内部会处理赋值逻辑
        return state.set('inputValue',action.value)
    }
    return state;
}