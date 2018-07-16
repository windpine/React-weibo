import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
    tweetInput:"",
    repostInput:"",
    commentInput:"",
    tweetButton:true,
    commentButton:true,
    tweetList:[],
    repostList:[],
    commentList:[],
    userMentionList:[]

})

export default (state=defaultState,action)=>{
    /*
    修改输入文本框里面的值
    */
    if(action.type===actionTypes.GET_TWEET_INPUT_CHANGE){
        if(action.input!==""){
            return state.set('tweetInput',action.input).set('tweetButton',false)
        }else{
            return state.set('tweetInput',action.input).set('tweetButton',true)
        }
    }
    if(action.type===actionTypes.GET_REPOST_INPUT_CHANGE){
        if(action.input!==""){
            return state.set('repostInput',action.input)
        }else{
            return state.set('repostInput',action.input)
        }
    }
    if(action.type===actionTypes.GET_COMMENT_INPUT_CHANGE){
        if(action.input!==""){
            return state.set('commentInput',action.input).set('commentButton',false)
        }else{
            return state.set('commentInput',action.input).set('commentButton',true)
        }
    }
    /*
    发送微博，转发和评论
     */
    if(action.type===actionTypes.SEND_TWEET){
        return state.set('tweetInput',"").set('tweetButton',true)
    }
    if(action.type===actionTypes.SEND_REPOST){
        return state.set('repostInput',"")
    }
    if(action.type===actionTypes.SEND_COMMENT){
        return state.set('commentInput',"").set('commentButton',true)
    }
    //修改微博、转发和评论列表
    if(action.type===actionTypes.CHANGE_TWEET_LIST){
        return state.set('tweetList',action.tweetList)
    }
    if(action.type===actionTypes.CHANGE_REPOST_LIST){
        return state.set('repostList',action.repostList)
    }
    if(action.type===actionTypes.CHANGE_COMMENT_LIST){
        return state.set('commentList',action.commentList)
    }
    /*
    修改userMentionList里面的值
     */
    if(action.type===actionTypes.ADD_USER_MENTION_LIST){
        const list=[]
        list.push(action.data)
        return state.merge({userMentionList:list})
    }
    return state;
}
