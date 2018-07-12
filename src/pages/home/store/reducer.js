import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
    list:[]
})

export default (state=defaultState,action)=>{
    if(action.type===actionTypes.GET_TWEET_LIST){
        return state.set('list',action.list);
    }
    if(action.type===actionTypes.GET_INPUT_CHANGE){
        console.log("reducer:,"+action.input);
    }
    if(action.type===actionTypes.GET_MENTION_USERS){

    }
    return state;
}
