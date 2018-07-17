import React from 'react'
import {Spin,Button} from 'antd'
import  * as messageType from './messageType';
import * as words from "../wordInternationalization";
import MessageListUI from './MessageListUI';
import{connect} from 'react-redux'
import axios from 'axios';
import {config, getConfig} from "../UriConfig";
import{getData} from '../Message'
import {actionCreators} from "../store";



/*function getDataButton(obj){
        switch(obj.props.messageType){
            case messageType.MENTION:
                obj.props.handleLoadingMoreMessage();
                axios.get('/mention',config).then((res) => {
                    let messageList = obj.props.messageList.concat(res.data.data.messageList);
                    obj.props.handleLoadMoreMessage(messageList);
                }).catch((res)=>{
                    obj.props.handleNoMoreMessage();
                });
            case messageType.COMMENT:
                obj.props.handleLoadingMoreMessage();
                axios.get('/comment',config).then((res) => {
                    let messageList = obj.props.messageList.concat(res.data.data.messageList);
                    obj.props.handleLoadMoreMessage(messageList);
                }).catch((res)=>{
                    obj.props.handleNoMoreMessage();
                });
            case messageType.LIKES:
                obj.props.handleLoadingMoreMessage();
                axios.get('/likes',config).then((res) => {
                    let messageList = obj.props.messageList.concat(res.data.data.messageList);
                    obj.props.handleLoadMoreMessage(messageList);
                }).catch((res)=>{
                    obj.props.handleNoMoreMessage();
                });
            default:
                obj.props.handleLoadingMoreMessage();
                axios.get('/mention',config).then((res) => {
                    let messageList = obj.props.messageList.concat(res.data.data.messageList);
                    obj.props.handleLoadMoreMessage(messageList);
                }).catch((res)=>{
                    obj.props.handleNoMoreMessage();
                });
        }
    }*/
class MessageList extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const loadMore = this.props.showLoadingMore ? (
            <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
                {this.props.loadingMore && <Spin />}
                {!this.props.loadingMore &&
                    <Button onClick={()=>{
                        this.props.handleLoadMoreMessage(this.props.messageList,this.props.messageType)}}>
                        {words.MESSAGE_LOAD_MORE_BUTTON}
                    </Button>
                }
            </div>
        ) : null;
        return (
            <MessageListUI
                title = {words.MESSAGE_TITLE}
                loading={this.props.loading}
                loadMore={loadMore}
                messageList={this.props.messageList}
                messageType={this.props.messageType}
            />
        )
    }
}
const convertStateToProps= (state)=>{

    return {
        loading: state.getIn(["message", "loading"]),
        loadingMore:state.getIn(["message","loadingMore"]),
        messageList:state.getIn(["message","messageList"]),
        messageType:state.getIn(["message","messageType"])
    }
};
const convertDispatchToProps = (dispatch) =>{
    return {
       handleLoadMoreMessage(list,type){
           let URL;
           if(type === 0)
               URL = '/mention';
           else if( type === 1)
               URL = '/comment';
           else
               URL = '/likes';
           dispatch(actionCreators.getLoadMoreMessageAction());
           axios.get(URL,getConfig()).then((res) => {
               let messageList = list.concat(res.data.data.messageList);
               dispatch(actionCreators.getLoadMoreMessageListAction(messageList));
           })
       }
    }
};

export default connect(convertStateToProps,convertDispatchToProps)(MessageList);
