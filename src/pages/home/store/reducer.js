import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
    mention:[],
    tweetInput:"",
    repostInput:"",
    commentInput:"",
    tweetButton:true,
    commentButton:true,
    tweetList:[],
    repostList:[],
    commentList:[]

})

export default (state=defaultState,action)=>{
    /*
    修改输入文本框里面的值
    */
    if(action.type===actionTypes.GET_TWEET_INPUT_CHANGE){
        console.log("reducer-tweetInputchange:"+action.input);
        if(action.input!==""){
            return state.set('tweetInput',action.input).set('tweetButton',false)
        }else{
            return state.set('tweetInput',action.input).set('tweetButton',true)
        }
    }
    if(action.type===actionTypes.GET_REPOST_INPUT_CHANGE){
        console.log("reducer-repost-Inputchange:"+action.input);
        if(action.input!==""){
            return state.set('repostInput',action.input)
        }else{
            return state.set('repostInput',action.input)
        }
    }
    if(action.type===actionTypes.GET_COMMENT_INPUT_CHANGE){
        console.log("reducer-commentInputchange:"+action.input);
        if(action.input!==""){
            return state.set('commentInput',action.input).set('commentButton',false)
        }else{
            return state.set('commentInput',action.input).set('commentButton',true)
        }
    }
    /*
    获取mention的值
     */
    if(action.type===actionTypes.SET_MENTION_LIST){
        //console.log('reducer-mentionList:'+action.list);
        return state.set('mention',action.list);
    }
    /*
    发送微博，转发和评论
     */
    if(action.type===actionTypes.SEND_TWEET){
        console.log('reducer-sendtweet:  '+state.get('tweetInput'));
        return state.set('tweetInput',"").set('tweetButton',true)
    }
    if(action.type===actionTypes.SEND_REPOST){
        console.log('reducer-sendrepost:  '+state.get('tweetInput'));
        return state.set('repostInput',"")
    }
    if(action.type===actionTypes.SEND_COMMENT){
        console.log('reducer-sendcomment:  '+state.get('tweetInput'));
        return state.set('commentInput',"").set('commentButton',true)
    }
    //修改微博、转发和评论列表
    if(action.type===actionTypes.CHANGE_TWEET_LIST){
        console.log('reducer-changetweet:');
        return state.set('tweetList',action.tweetList)
    }
    if(action.type===actionTypes.CHANGE_REPOST_LIST){
        console.log('reducer-changetweet:');
        return state.set('repostList',action.repostList)
    }
    if(action.type===actionTypes.CHANGE_COMMENT_LIST){
        console.log('reducer-changetweet:');
        return state.set('commentList',action.commentList)
    }
    return state;
}
