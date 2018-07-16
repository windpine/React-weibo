import * as actionTypes from './actionTypes'

export const getGetMessageListAction=(messageList)=>({
    type: actionTypes.GET_MESSAGE_LIST,
    messageList
})
export const getChangeToInputMessage=()=>(
    {
        type:actionTypes.CHANGE_TO_INPUT_MESSAGE,
    }
)
export const getLoadMoreMessageListAction=(messageList)=>(
    {
        type:actionTypes.LOAD_MORE_MESSAGE_LIST,
        messageList
    }
)
export const getSendMessage =(message)=>(
    {
        type:actionTypes.SEND_MESSAGE,
        message
    }
)
export const getLoadMoreMessageAction = (messageType)=>(
    {
        type:actionTypes.LOAD_MORE_MESSAGE,
        messageType
    }
)
export const getNoMoreMessageListAction = () =>(
    {
        type:actionTypes.NO_MORE_MESSAGE,
    }
)