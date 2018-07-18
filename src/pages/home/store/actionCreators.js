import * as actionTypes from './actionTypes';
import {fromJS} from 'immutable';
import axios from 'axios';
import {actionCreators} from "./index";
import {ContentSplit} from "../Util";
import store from "../../../store";
import {CHANGE_ACTIVEKEY} from "../../profile/store/actionTypes";


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
/*
将获取到的个人信息存起来存到Home的子reducer
 */
export const changeUserInfoActoin=(result,password)=>({
    type:actionTypes.CHANGE_USERINFO,
    userInfo:result,
    password:password,

})

export const changeActiveKey=(result)=>({
    type:actionTypes.CHANGE_ACTIVEKEY,
    result:result,
})

/*
创建发送微博、转发、评论的action，post到服务器
 */
export  const sendTweetAction=(value)=>{
    return (dispatch)=>{
        console.log(store.getState().getIn(['home','file']).get('url'))
        const data={
            "uid":sessionStorage.getItem('uid'),
            "srcId":-1,
            "content":value,
            "imageUrl":store.getState().getIn(['home','file']).get('url')
        }
        axios.post('/tweets',data,config).then((res)=>{
            //清空tweet的Input,刷新微博列表
            const action1=getInputChangeAction("","tweet")
            const action2=getTweetList()
            dispatch(action1)
            dispatch(action2)
            publishMessage(res.data)
        })
    }
}
//检查是否需要发送@的提醒，不用export
const publishMessage=(tweet)=>{
    const format=ContentSplit(tweet.content);
    const users=format.filter((item)=>{
        return item.type==="user"
    })
    console.log("user:",users)
    const userMentionList=store.getState().getIn(['home','userMentionList']);
    console.log("userMentionList:",userMentionList)
    users.map((userItem)=>{
        userMentionList.map((item)=>{
            console.log("item",item)
            if(item.get('nickname')===userItem.data.substring(1)){
                console.log("进入匹配了")
                const message={
                    "type":0,
                    "srcId":tweet.tid,
                    "content":tweet.content,
                    "uid":item.get('uid'),
                    "srcUid":tweet.uid
                }
                axios.post("/message",message,config).then(res=>{
                    console.log("message:",res)
                })
                const mention={
                    "tid":tweet.tid,
                    "uid":item.get('uid')
                }
                axios.post("/mention",mention,config).then(res=>{
                    console.log("mention:",res)
                })
            }
        })
    })
}


export  const sendRepostAction=(tid,uid,content)=>{
    return (dispatch)=>{
        console.log("进入转发了,tid:",tid)
    const data={
        "uid":sessionStorage.getItem('uid'),
        "srcId":tid,
        "content":content
    }
    axios.post('/tweets',data,config).then((res)=>{
        //清空tweet的Input,刷新微博列表
        const action1=getInputChangeAction("","repost")
        const action2=getRepostList(tid)
        const action3=getTweetList()
        dispatch(action1)
        dispatch(action2)
        dispatch(action3)
        pulishRepostMesaage(tid,uid,content)
    })
    }
}
const pulishRepostMesaage=(tid,uid,content)=>{
    const message={
        "type":3,
        "srcId":tid,
        "content":content,
        "uid":uid,
        "srcUid":sessionStorage.getItem('uid')
    }
    axios.post("/message",message,config).then(res=>{
        console.log("message:",res)
    })

}

export  const sendCommentAction=(tid,uid,content)=>{
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
        pulishCommentMesaage(tid,uid,content)
    })
}
}
const pulishCommentMesaage=(tid,uid,content)=>{
    const message={
        "type":1,
        "srcId":tid,
        "content":content,
        "uid":uid,
        "srcUid":sessionStorage.getItem('uid')
    }
    axios.post("/message",message,config).then(res=>{
        console.log("message:",res)
    })

}
//拿到发送微博的，评论的和转发的列表
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
            const action = changeCommentList(result);
            dispatch(action)
        })
    }
}
export const getRepostList=(tid)=>{
    return (dispatch)=>{
        axios.get("/tweets/repost/"+tid,config).then((res)=> {
            const result = res.data.data.repostList;
            console.log(result);
            const action = changeRepostList(result);
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
/*
创建将提到的用户放Store里面的action
 */
export const getUserMentionAction=(data)=>({
    type:actionTypes.ADD_USER_MENTION_LIST,
    data:data
})


/*
关于上传图片
 */
export const handleFileChange=(file)=>({
    type:actionTypes.HANDLE_FILE_CHANGE,
    file
})

export const handlePreview=(file)=>({
    type:actionTypes.HANDLE_PREVIEW,
    file
})

export const handlePreviewCancle=()=>({
    type:actionTypes.HANDLE_PREVIEW_CANCLE,
})