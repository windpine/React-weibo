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
    userMentionList:[],

    previewVisible: false,
    file: {
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: '',
    },

})

const baseURL='https://weibo-1252079771.cos.ap-beijing.myqcloud.com/'

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
    发送微博，转发和评论过后清空输入框
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
        return state.set('userMentionList',state.get('userMentionList').concat(fromJS(list)))
    }

    /*
    关于上传图片
     */
    if(action.type===actionTypes.HANDLE_FILE_CHANGE){
        console.log('获得文件：'+action.file.name)
        const file = action.file;
        const url=baseURL+file.name;
        return state.setIn(['file','uid'],file.uid)
            .setIn(['file','name'],file.name)
            .setIn(['file','url'],url)
            .setIn(['register','avatarUrl'],url)
    }
    if(action.type===actionTypes.HANDLE_PREVIEW){
        return state.set('previewVisible',true);
    }
    if(action.type===actionTypes.HANDLE_PREVIEW_CANCLE){
        return state.set('previewVisible',false);
    }

    return state;
}
