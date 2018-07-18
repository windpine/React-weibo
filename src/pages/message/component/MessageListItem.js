import MessageListItemUI from './MessageListItemUI';
import React from 'react';
import {connect} from 'react-redux';
import axios from "axios/index";

import {Modal} from "antd";
import {actionCreators} from "../store";
import {deleteConfig, getConfig} from "../UriConfig";
import * as messageType from "./messageType";

const confirm = Modal.confirm;

class MessageListItem extends React.Component{
    constructor(props){
        super(props);
    }

    showDeleteConfirm(messageID,obj) {
        confirm({
            title: '确认删除这条消息？',
            okText: '是',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                console.log(messageID);
                axios.delete('/',deleteConfig(messageID)).then(()=>{
                    obj.props.handleLoadMessage(obj.props.messageType);
                })
                //TODO:添加catch
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    render(){
        return(
          <MessageListItemUI
              item={this.props.item}
              deleteAction={(messageID)=>{this.showDeleteConfirm(messageID,this)}}
              messageType={this.props.messageType}
          />
        )
    }
}

const convertStateToProps= (state)=>{

    return {
        messageType:state.getIn(["message","messageType"])
    }
};
const convertDispatchToProps = (dispatch) =>{
    return {
        handleLoadMessage(type){
            let URL;
            if(type === messageType.MENTION)
                URL = '/mention';
            else if( type === messageType.COMMENT)
                URL = '/comment';
            else if(type === messageType.LIKES)
                URL = '/likes';
            dispatch(actionCreators.getLoadMessageAction());
            axios.get(URL,getConfig()).then((res) => {
                let messageList=res.data.data.messageList;
                dispatch(actionCreators.getLoadMessageListAction(messageList));
            })
            //TODO:添加catch方法
        },
    }
};

export default connect(convertStateToProps,convertDispatchToProps)(MessageListItem);