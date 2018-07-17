import React,{Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import{Button,Spin,Menu} from 'antd';

import store from '../../store';
import MessageUI from './MessageUI';
import {actionCreators} from "./store";
import * as words from './wordInternationalization'
import {Redirect} from 'react-router-dom'
import {config} from './UriConfig'
import * as messageType from './component/messageType'

//向服务器获取更多信息
function getData(obj,index){
    if(obj.props.loading !== true)
        switch(index){
            case messageType.MENTION:
                obj.props.handleLoadingMoreMessage();
                axios.get('/mention',config).then((res) => {
                    let messageList = res.data.data.messageList;
                    obj.props.handleLoadMoreMessage(messageList,index);
                }).catch((res)=>{
                    obj.props.handleNoMoreMessage();

                });
                break;
            case messageType.COMMENT:
                obj.props.handleLoadingMoreMessage();
                axios.get('/comment',config).then((res) => {
                    let messageList = res.data.data.messageList;
                    obj.props.handleLoadMoreMessage(messageList,index);
                }).catch((res)=>{
                    obj.props.handleNoMoreMessage();

                });
                break;
            case messageType.LIKES:
                obj.props.handleLoadingMoreMessage();
                axios.get('/likes',config).then((res) => {
                    let messageList = res.data.data.messageList;
                    obj.props.handleLoadMoreMessage(messageList,index);
                }).catch((res)=>{
                    obj.props.handleNoMoreMessage();

                });
                break;
            default:
                obj.props.handleLoadingMoreMessage();
                axios.get('/mention',config).then((res) => {
                    let messageList = res.data.data.messageList;
                    obj.props.handleLoadMoreMessage(messageList,index);
                }).catch((res)=>{
                    obj.props.handleNoMoreMessage();

                });
    }
}

class Message extends Component{
    constructor(props){
        super(props);
    }
    render(){
        if(sessionStorage.getItem('uid') !== null)
            return(
                <MessageUI
                    title={words.MESSAGE_TITLE}
                    loading={this.props.loading}
                    messageList={this.props.messageList}
                    messageType={this.props.messageType}
                    click={(index)=>getData(this,index)}
                />
            )
        else
            return <Redirect to='/welcome'/>;
    }
    componentDidMount(){
        axios.get('/mention',config).then((res) => {
            let messageList=res.data.data.messageList;
            this.props.handleGetMessageList(messageList);
        }).catch((res)=>{
            console.log(res);
        })
    }
}

const mapStatesToProps = (state)=>{
    return {
        loading:state.getIn(["message",'loading']),
        loadingMore:state.getIn(['message','loadingMore']),
        showLoadingMore:state.getIn(['message','showLoadingMore']),
        messageList:state.getIn(['message',"messageList"]),
        messageType:state.getIn(["message","messageType"])
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        handleGetMessageList(list){
            dispatch(actionCreators.getGetMessageListAction(list));
        },
        handleLoadingMoreMessage(){
            dispatch(actionCreators.getLoadMoreMessageAction());
        },
        handleLoadMoreMessage(list,type){
            dispatch(actionCreators.getLoadMoreMessageListAction(list,type));
        },
        handleNoMoreMessage(){
            dispatch(actionCreators.getNoMoreMessageListAction());
        }
    }
}

export {getData};
export default connect(mapStatesToProps,mapDispatchToProps)(Message);