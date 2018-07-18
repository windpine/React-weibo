import {fromJS} from 'immutable';
import * as actionTypes from "../../profile/store/actionTypes";

const baseURL='https://weibo-1252079771.cos.ap-beijing.myqcloud.com/'

const defaultState=fromJS(
    {

        tweetsList:[],//发表的微博列表
        followsList:[],
        followersList:[],//粉丝列表
        tweets:0,
        follows:0,
        followers:0,
        uid:'',
        nickname:'',
        username:'',
        sex:'',
        email:'',
        password:'',//密码
        avatarUrl:'',
        // data:{
        //     uid:'',//id
        //     nickname:'',//昵称
        //     username:'',//
        //     sex:'',//性别
        //     email:'',//邮箱
        // },
        //userClick:'',
        previewVisible: false,
        file: {
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: '',
        },
        isFollow:'',
    }
);


//todo：更新用户头像；粉丝和关注列表的排序等；UI优化；管理中心（粉丝分析、互动分析）；


export default (state=defaultState,action)=>{
    switch(action.type) {
        case actionTypes.SAVE_FORM_DATA:
            return state.set('nickname', action.value['nickname'])
                .set('username', action.value['username'])
                .set('sex', action.value['sex'])
                .set('email', action.value['email'])
                .set('password',action.value['password'])
                .set('uid',action.value['uid'])
                .set('avatarUrl',action.value['avatarUrl'])
                .set('tweets',action.value['tweets'])
                .set('follows',action.value['follows'])
                .set('followers',action.value['followers'])

        case actionTypes.CHANGE_PASSWORD:
            return state.set('password',action.password);
        case actionTypes.CHANGE_INPUT_NICKNAME:
            return state.set('nickname',action.nickname);
        case actionTypes.CHANGE_INPUT_USERNAME:
            return state.set('username',action.username);
        case actionTypes.CHANGE_INPUT_SEX:
            return state.set('sex',action.sex);
        case actionTypes.CHANGE_INPUT_EMAIL:
            return state.set('email',action.email);
        case actionTypes.CHANGE_FOLLOWLIST:
            return state.set('followsList',action.follows);
        case actionTypes.CHANGE_FOLLOWERLIST:
            return state.set('followersList',action.followers);
        case actionTypes.CHANGE_USERINFO:
            return state.set('nickname', action.userInfo['nickname'])
                .set('username', action.userInfo['username'])
                .set('sex', action.userInfo['sex'])
                .set('email', action.userInfo['email'])
                .set('password',action.password)
                .set('uid',action.userInfo['uid'])
                .set('avatarUrl',action.userInfo['avatarUrl'])
                .setIn(['file', 'url'],action.userInfo['avatarUrl'])
                .set('tweets',action.userInfo['tweets'])
                .set('follows',action.userInfo['follows'])
                .set('followers',action.userInfo['followers'])
        case actionTypes.HANDLE_PROFILEFILE_CHANGE: {
            console.log('获得文件：' + action.file.name)
            const file = action.file;
            const url = baseURL + file.name;
            console.log("ProfileavatarUrl:",url);
            return state.setIn(['file', 'uid'], file.uid)
                .setIn(['file', 'name'], file.name)
                .setIn(['file', 'url'], url)
                .set('avatarUrl', url)
        }
        case actionTypes.HANDLE_PROFILEPREVIEW:
            return state.set('previewVisible',true);
        case actionTypes.HANDLE_PROFILEPREVIEW_CANCLE:
            return state.set('previewVisible',false);
        case actionTypes.CHANGE_ISFOLLOW:
            return state.set('isFollow',action.result);

        default:
            return state;


    }

}