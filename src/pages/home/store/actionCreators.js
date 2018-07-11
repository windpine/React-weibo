import * as actionTypes from './actionTypes';

export const getTweetList=(list)=>({
    type: actionTypes.GET_TWEET_LIST,
    list
})