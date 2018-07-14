import React,{Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import{Button,Spin,Menu} from 'antd';

import store from '../../store';
import MessageUI from './MessageUI';
import {actionCreators} from "./store";
import * as words from './wordInternationalization'
const MENTION = 0;
const COMMENT = 1;
const LIKES = 2;
var config = {
    baseURL:'http://localhost:8080/message/',
    params:{
        UID :'d0cd8feaa8f84fada679abd5a5fca198'
    }
}
class Message extends Component{

    constructor(props){
        super(props);
        store.subscribe(this.props.handleStoreChange.bind(this));
    }
    getDataButton(obj){
        switch(obj.props.messageType){
            case MENTION:
                obj.props.handleLoadingMoreMessage();
                axios.get('/mention',config).then((res) => {
                    let messageList = obj.props.messageList.concat(res.data.data.messageList);
                    obj.props.handleLoadMoreMessage(messageList);
                }).catch((res)=>{
                    obj.props.handleNoMoreMessage();
                });
            case COMMENT:
                obj.props.handleLoadingMoreMessage();
                axios.get('/comment',config).then((res) => {
                    let messageList = obj.props.messageList.concat(res.data.data.messageList);
                    obj.props.handleLoadMoreMessage(messageList);
                }).catch((res)=>{
                    obj.props.handleNoMoreMessage();
                });
            case LIKES:
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
    }
    //向服务器获取更多信息
    getData(obj,index){
        switch(index){
            case MENTION:
                    obj.props.handleLoadingMoreMessage(index);
                    axios.get('/mention',config).then((res) => {
                        let messageList = res.data.data.messageList;
                        obj.props.handleLoadMoreMessage(messageList);
                    }).catch((res)=>{
                        obj.props.handleNoMoreMessage();

                    });
            case COMMENT:
                obj.props.handleLoadingMoreMessage(index);
                axios.get('/comment',config).then((res) => {
                    let messageList = res.data.data.messageList;
                    obj.props.handleLoadMoreMessage(messageList);
                }).catch((res)=>{
                    obj.props.handleNoMoreMessage();

                });
            case LIKES:
                obj.props.handleLoadingMoreMessage(index);
                axios.get('/likes',config).then((res) => {
                    let messageList = res.data.data.messageList;
                    obj.props.handleLoadMoreMessage(messageList);
                }).catch((res)=>{
                    obj.props.handleNoMoreMessage();

                });
            default:
                obj.props.handleLoadingMoreMessage(index);
                axios.get('/mention',config).then((res) => {
                    let messageList = res.data.data.messageList;
                    obj.props.handleLoadMoreMessage(messageList);
                }).catch((res)=>{
                    obj.props.handleNoMoreMessage();

                });
        }
    }

    render(){
        const loadMore = this.props.showLoadingMore ? (
            <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
                {this.props.loadingMore && <Spin />}
                {!this.props.loadingMore && <Button onClick={()=>{this.getDataButton(this)}}>{words.MESSAGE_LOAD_MORE_BUTTON}</Button>}
            </div>
        ) : null;
        const menu = (
            <Menu style={{}}>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" >{words.MESSAGE_RIGHT_MENU[0]}</a>
                </Menu.Item>
            </Menu>
        );
        return(
            <MessageUI
                title={words.MESSAGE_TITLE}
                menu = {menu}
                isList={true}
                loadMore={loadMore}
                loading={this.props.loading}
                messageList={this.props.messageList}
                siderMenuTitle={words.MESSAGE_SIDER_MENU_TITLE}
                siderMenuSubmenu={words.MESSAGE_SIDER_MENU_SUBMENU}
                messageType={this.props.messageType}
                click={(index)=>this.getData(this,index)}
            />
        )
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
       handleStoreChange(){
            this.setState(store.getState(),() => {
                // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                // In real scene, you can using public method of react-virtualized:
                // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
                window.dispatchEvent(new Event('resize'));
            });

        },
        handleLoadingMoreMessage(type){
            dispatch(actionCreators.getLoadMoreMessageAction(type));
        },
        handleLoadMoreMessage(list){
            dispatch(actionCreators.getLoadMoreMessageListAction(list));
        },
        handleNoMoreMessage(){
            dispatch(actionCreators.getNoMoreMessageListAction());
        }
    }
}


export default connect(mapStatesToProps,mapDispatchToProps)(Message);