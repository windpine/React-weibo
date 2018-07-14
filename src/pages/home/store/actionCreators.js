import * as actionTypes from './actionTypes';
import axios from "axios/index";
import {fromJS} from 'immutable';

export const getInputChangeAction=(input,inputType)=>{
    if(inputType==="tweet"){
        return {
            type:actionTypes.GET_TWEET_INPUT_CHANGE,
            input
        }
    }
    else if(inputType==="repost"){
        return {
            type:actionTypes.GET_REPOST_INPUT_CHANGE,
            input
        }
    }else if(inputType==="comment"){
        return {
            type:actionTypes.GET_COMMENT_INPUT_CHANGE,
            input
        }
    }
}

//用来处理法微博输入框的@和#的3个
export const setMentionList=(list)=>({
    type:actionTypes.SET_MENTION_LIST,
    list:fromJS(list)
})

export const getMentionUsers=()=>{
    return(dispatch)=>{
        axios.get('/api/MentionUsers.json').then((res)=>{
            const result=res.data.data;
            console.log('actionCreater:'+result);
            dispatch(setMentionList(result))
        });
    }
}
export const getMentionTopics=()=>{
    return(dispatch)=>{
        axios.get('/api/MentionTopics.json').then((res)=>{
            const result=res.data.data;
            dispatch(setMentionList(result))
        });
    }
}
//创建发送微博的action
export  const getSendTweetAction=()=>({
    type:actionTypes.SEND_TWEET
})

//获取全部微博
export const changeTweetList=(list)=>({
    type:actionTypes.CHANGE_TWEET_LIST,
    tweetList:fromJS(list)
})
//获取转发的记录
export const changeRepostList=(list)=>({
    type:actionTypes.CHANGE_REPOST_LIST,
    repostList:fromJS(list)
})
//获取评论的记录
export const changeCommentList=(list)=>({
    type:actionTypes.CHANGE_COMMENT_LIST,
    commentList:fromJS(list)
})