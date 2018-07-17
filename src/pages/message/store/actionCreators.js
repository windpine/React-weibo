import * as actionTypes from './actionTypes'

export const getLoadMessageAction=()=>({
    type:actionTypes.LOAD_MESSAGE,
});
export const getLoadMessageListAction=(messageList,messageType)=>({
    type: actionTypes.LOAD_MESSAGE_LIST,
    messageList,
    messageType
});
export const getLoadMoreMessageAction = ()=>(
    {
        type:actionTypes.LOAD_MORE_MESSAGE,
    }
);
export const getLoadMoreMessageListAction=(messageList)=>(
    {
        type:actionTypes.LOAD_MORE_MESSAGE_LIST,
        messageList,
    }
);
export const getSendMessage =(message)=>(
    {
        type:actionTypes.SEND_MESSAGE,
        message
    }
);
export const getChangeToInputMessage=()=>(
    {
        type:actionTypes.CHANGE_TO_INPUT_MESSAGE,
    }
);
export const getNoMoreMessageListAction = () =>(
    {
        type:actionTypes.NO_MORE_MESSAGE,
    }
);