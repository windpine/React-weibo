import * as actionTypes from './actionTypes';
import axios from "axios/index";
import {fromJS} from 'immutable';

export const getTweetList=(list)=>({
    type: actionTypes.GET_TWEET_LIST,
    list
})

export const getInputChangeAction=(input)=>({
    type:actionTypes.GET_INPUT_CHANGE,
    input
})

export const getMentionUsers=()=>{
    axios.get('/api.MentionUsers.json').then((res)=>{
        const result=res.data.data;
        dispatch((result)=>{
            type:actionTypes.GET_MENTION_USERS,
            list:fromJS(result)
        })
    });
}