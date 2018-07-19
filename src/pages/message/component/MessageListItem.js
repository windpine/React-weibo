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
                }).catch((error)=>{
                    alert(error.msg);
                })

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
              showModal={this.props.handleShowModal}
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
            dispatch(actionCreators.getLoadMessageAction());
            axios.get('/',getConfig(type)).then((res) => {
                let messageList=res.data.data.messageList;
                dispatch(actionCreators.getLoadMessageListAction(messageList));
            }).catch((error)=>{
                alert(error.msg);
            })
        },
        handleShowModal(){
            dispatch(actionCreators.getShowModalAction());
        }
    }
};

export default connect(convertStateToProps,convertDispatchToProps)(MessageListItem);