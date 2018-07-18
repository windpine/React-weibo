import * as actionTypes from './actionTypes'
import {fromJS} from 'immutable';

const defaultState=fromJS({
    loading: false,
    loadingMore: false,
    showLoadingMore: true,
    messageList:[],
    messageType:0
});
export default (state=defaultState,action)=>{
    switch(action.type){
        case actionTypes.LOAD_MESSAGE:
            return state.merge({
                //请求messagelist
                showLoadingMore:true,
                loading:true,
            });
        case actionTypes.LOAD_MESSAGE_LIST :
            //获取messagelist并改变loading状态
            return state.merge({
                messageList:action.messageList,
                loading:false,
                messageType:action.messageType
            });
        case actionTypes.LOAD_MORE_MESSAGE:
            //请求获取更多message
            return state.merge({
                loadingMore:true,
            });
        case actionTypes.LOAD_MORE_MESSAGE_LIST:
            //请求成功
            return state.merge({
                messageList:action.messageList,
                loadingMore:false,
            });
        case actionTypes.NO_MORE_MESSAGE:
            //无返回数据
            return state.merge({
                showLoadingMore:false,
                loadingMore:false
            });
        default:
            return state;
    }
}