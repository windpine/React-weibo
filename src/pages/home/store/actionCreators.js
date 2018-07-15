import * as actionTypes from './actionTypes';
import {fromJS} from 'immutable';
import axios from 'axios';
import {actionCreators} from "./index";

var config = {
    baseURL: 'http://localhost:8080'
};
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
//创建发送微博、转发、评论的action
export  const sendTweetAction=(value)=>{
    return (dispatch)=>{
        const data={
            "uid":sessionStorage.getItem('uid'),
            "content":value
        }
        console.log(data)
        axios.post('/tweets',data,config).then((res)=>{
            const action1=getInputChangeAction("","tweet")
            const action2=getTweetList()
            dispatch(action1)
            dispatch(action2)
        })
    }
}
export  const sendRepostAction=()=>({
    type:actionTypes.SEND_TWEET
})
export  const sendCommentAction=(tid,content)=>{
    return (dispatch)=>{
    const data={
        "uid":sessionStorage.getItem('uid'),
        "tid":tid,
        "srcId":-1,
        "content":content
    }
    console.log(data)
    axios.post('/comments',data,config).then((res)=>{
        const action1=getInputChangeAction("","comment")
        const action2=getCommentList(tid)
        dispatch(action1)
        dispatch(action2)
    })
}
}

export const getTweetList=()=>{
    return (dispatch)=>{
        axios.get("/tweets",config).then((res)=> {
        const result = res.data.data.tweetList;
        console.log(result);
        const action = changeTweetList(result);
        dispatch(action)
        })
    }
}
export const getCommentList=(tid)=>{
    return (dispatch)=>{
        axios.get("/comments"+"/"+tid,config).then((res)=> {
            const result = res.data.data.commentList;
            console.log(result);
            const action = changeTweetList(result);
            dispatch(action)
        })
    }
}

/*
将获取的全部微博、转发、评论放到列表
 */
export const changeTweetList=(list)=>({
    type:actionTypes.CHANGE_TWEET_LIST,
    tweetList:fromJS(list)
})
export const changeRepostList=(list)=>({
    type:actionTypes.CHANGE_REPOST_LIST,
    repostList:fromJS(list)
})
export const changeCommentList=(list)=>({
    type:actionTypes.CHANGE_COMMENT_LIST,
    commentList:fromJS(list)
})