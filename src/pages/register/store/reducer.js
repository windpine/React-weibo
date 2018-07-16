import * as actionTypes from './actionTypes'
import {fromJS} from 'immutable';

const baseURL='https://weibo-1252079771.cos.ap-beijing.myqcloud.com/'

const defaultState=fromJS({
    register:{
        username:'',
        password:'',
        confirm:'',
        email:'',
        nickname:'',
        //captcha:''
        avatarUrl:''
    },
    confirmDirty:false,
    autoCompleteResult: [],
    previewVisible: false,
    file: {
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
});
export default (state=defaultState,action)=>{
    if(action.type===actionTypes.SAVE_REGISTER_INFO){
        return state.set('register',state.get('register').merge(action.values));
    }
    if(action.type===actionTypes.CONFIRM_BLUR){
        return state.set('confirmDirty',
            state.get('confirmDirty')||!!action.value);
    }
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