import * as actionTypes from './actionTypes';
import {fromJS} from 'immutable';
import axios from 'axios';
import {ContentSplit} from "../Util";
import store from "../../../store";


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
export const changeHomeUserInfoActoin=(result)=>({
    type:actionTypes.CHANGE_HOME_USERINFO,
    userInfo:result,
})

export const changeActiveKey=(result)=>({
    type:actionTypes.CHANGE_ACTIVEKEY,
    result:result,
})

/*
创建发送微博的action，post到服务器
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
        }).catch(error => {
            alert(error.response.data.msg)
        })
    }
}
//检查是否需要发送@的提醒，不用export
const publishMessage=(tweet)=>{
    const format=ContentSplit(tweet.content);
    const users=format.filter((item)=>{
        return item.type==="user"
    })
    const userMentionList=store.getState().getIn(['home','userMentionList']);
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
                //post message
                axios.post("/message",message,config).then(res=>{
                    console.log("message:",res)
                }).catch(error => {
                    alert(error.response.data.msg)
                })
                const mention={
                    "tid":tweet.tid,
                    "uid":item.get('uid')
                }
                //post mention
                axios.post("/mention",mention,config).then(res=>{
                    console.log("mention:",res)
                }).catch(error => {
                    alert(error.response.data.msg)
                })
            }
        })
    })
}

//转发微博
export  const sendRepostAction=(tid,uid,content,type,checked)=>{
    return (dispatch)=>{
        const data={
            "uid":sessionStorage.getItem('uid'),
            "srcId":tid,
            "content":content
        }
        axios.post('/tweets',data,config).then((res)=>{
            //清空tweet的Input,刷新微博列表
            const action1=getInputChangeAction("","repost")
            const action2=getRepostList(tid)
            dispatch(action1)
            dispatch(action2)
            if(type==="personal"){
                const action3=getPersonalList(sessionStorage.getItem('uid'))
                dispatch(action3)
            }if(type==="all"){
                const action4=getTweetList()
                dispatch(action4)
            }
            pulishRepostMesaage(tid,uid,content)
        }).catch(error => {
            alert(error.response.data.msg)
        })

        if(checked){
            //如果点击了同时评论到微博
            const data2={
                "uid":sessionStorage.getItem('uid'),
                "tid":tid,
                "srcId":-1,
                "content":content
            }
            axios.post('/comments',data2,config).then((res)=>{
                const action2=getCommentList(tid)
                dispatch(action2)
                pulishCommentMesaage(tid,uid,content)
            }).catch(error => {
                alert(error.response.data.msg)
            })
        }
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
    }).catch(error => {
        alert(error.response.data.msg)
    })

}
//发送评论
export  const sendCommentAction=(tid,uid,content,type,checked)=>{
    return (dispatch)=>{
        const data={
            "uid":sessionStorage.getItem('uid'),
            "tid":tid,
            "srcId":-1,
            "content":content
        }
        axios.post('/comments',data,config).then((res)=>{
            const action1=getInputChangeAction("","comment")
            const action2=getCommentList(tid)
            dispatch(action1)
            dispatch(action2)
            pulishCommentMesaage(tid,uid,content)
        }).catch(error => {
            alert(error.response.data.msg)
        })

        if(checked){
            //如果点击了同时转发到微博
            const data2={
                "uid":sessionStorage.getItem('uid'),
                "srcId":tid,
                "content":content
            }
            axios.post('/tweets',data2,config).then((res)=>{
                const action2=getRepostList(tid)
                dispatch(action2)
                if(type==="personal"){
                    const action3=getPersonalList(sessionStorage.getItem('uid'))
                    dispatch(action3)
                }if(type==="all"){
                    const action4=getTweetList()
                    dispatch(action4)
                }
                pulishRepostMesaage(tid,uid,content)
            }).catch(error => {
                alert(error.response.data.msg)
            })
        }
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
    }).catch(error => {
        alert(error.response.data.msg)
    })
}

//拿到个人微博的列表的活动
export const getPersonalList=(UID)=>{
    return (dispatch)=>{
        axios.get("/tweets/"+UID,config).then((res)=> {
            const result = res.data.data.tweetList;
            console.log(result);
            const action = changeTweetList(result);
            dispatch(action)
        }).catch(error => {
            alert(error.response.data.msg)
        })
    }
}

//拿到发送微博的，评论的和转发的列表
export const getTweetList=()=>{
    return (dispatch)=>{
        axios.get("/tweets",config).then((res)=> {
            const result = res.data.data.tweetList;
            console.log(result);
            const action = changeTweetList(result);
            dispatch(action)
        }).catch(error => {
            alert(error.response.data.msg)
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
        }).catch(error => {
            alert(error.response.data.msg)
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
        }).catch(error => {
            alert(error.response.data.msg)
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
    repostList:list
})
export const changeCommentList=(list)=>({
    type:actionTypes.ADD_COMMENT_LIST,
    commentList:list
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