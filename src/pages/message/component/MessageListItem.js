import MessageListItemUI from './MessageListItemUI';
import React from 'react';
import {connect} from 'react-redux';
import store from '../../../store'
import axios from "axios/index";
import {getData} from "../Message";
import {Modal} from "antd";
import {actionCreators} from "../store";

const confirm = Modal.confirm;

class MessageListItem extends React.Component{
    constructor(props){
        super(props);
    }
    deleteAction(messageID,obj){
        console.log(messageID);
        let deleteConfig={
            baseURL:'http://localhost:8080',
            params:{
                UID:sessionStorage.getItem('uid'),
                messageID:messageID,
            }
        }
        axios.delete('/message',deleteConfig).then((res)=>{
            getData(obj,obj.props.messageType);
        })
    }
    showDeleteConfirm(messageID,obj) {
        confirm({
            title: '确认删除这条消息？',
            okText: '是',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                obj.deleteAction(messageID,obj);
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
}
const convertDispatchToProps = (dispatch) =>{
    return {
        handleLoadingMoreMessage(){
            dispatch(actionCreators.getLoadMoreMessageAction());
        },
        handleLoadMoreMessage(list,type){
            dispatch(actionCreators.getLoadMoreMessageListAction(list,type));
        }
    }
}

export default connect(convertStateToProps,convertDispatchToProps)(MessageListItem);