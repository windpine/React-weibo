import * as actionTypes from './actionTypes'
import {fromJS} from 'immutable';

const defaultState=fromJS({
    register:{
        username:'',
        password:'',
        confirm:'',
        email:'',
        nickname:''
        //captcha:''
    },
    confirmDirty:false,
    autoCompleteResult: [],
    previewVisible: false,
    previewImage: '',
    fileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }],
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
        return state.setIn(['register','fileList'],fromJS(action.fileList));
    }
    if(action.type===actionTypes.HANDLE_PREVIEW){
        const file = action.file;
        return state.setIn(['register','previewImage'],fromJS(file.url||file.thumbUrl))
            .setIn(['register','previewVisible'],true);
    }
    if(action.type===actionTypes.HANDLE_PREVIEW_CANCLE){
        return state.setIn(['register','previewVisible'],false);
    }
    return state;
}