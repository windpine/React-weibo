import * as actionTypes from './actionTypes'
import {fromJS} from 'immutable';

const defaultState=fromJS({
    loading: true,
    loadingMore: false,
    showLoadingMore: true,
    messageList:[],
    messageType:0
});
export default (state=defaultState,action)=>{
    switch(action.type){
        case actionTypes.GET_MESSAGE_LIST :
            //获取messagelist并改变loading状态
            return state.merge({
                messageList:action.messageList,
                loading:false
            });
        case actionTypes.LOAD_MORE_MESSAGE:
            //请求获取更多message
            return state.merge({
                loadingMore:true,
                messageType:action.messageType
            })
        case actionTypes.LOAD_MORE_MESSAGE_LIST:
            //请求成功
            return state.merge({
                messageList:action.messageList,
                loadingMore:false
            })
        case actionTypes.NO_MORE_MESSAGE:
            //无返回数据
            return state.merge({
                showLoadingMore:false
            })
        default:
            return state;
    }
}