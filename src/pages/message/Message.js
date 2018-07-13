import React,{Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import{Button,Spin,Menu} from 'antd';

import store from '../../store';
import MessageUI from './MessageUI';
import {actionCreators} from "./store";
import * as words from './wordInternationalization'
class Message extends Component{

    constructor(props){
        super(props);
        store.subscribe(this.props.handleStoreChange.bind(this));
    }
    //向服务器获取更多信息
    getData(obj){
        console.log(obj.props);
        obj.props.handleLoadingMoreMessage();
        axios.get('../../../api/message.json').then((res) => {
            if(obj.props.messageList[0].messageID !== res.data.data.messageList[0].messageID){
                let messageList=obj.props.messageList.concat(res.data.data.messageList);
                obj.props.handleLoadMoreMessage(messageList);
            }else{
                obj.props.handleNoMoreMessage();
            }
        }).catch((res)=>{
            obj.props.handleNoMoreMessage();
            console.log(res);
        })
    }

    render(){
        const loadMore = this.props.showLoadingMore ? (
            <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
                {this.props.loadingMore && <Spin />}
                {!this.props.loadingMore && <Button onClick={()=>{this.getData(this)}}>{words.MESSAGE_LOAD_MORE_BUTTON}</Button>}
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
            />
        )
    }
    componentDidMount(){
        axios.get('../../../api/message.json').then((res) => {
            let messageList=res.data.data.messageList
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
        messageList:state.getIn(['message',"messageList"])
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
        handleLoadingMoreMessage(){
            dispatch(actionCreators.getLoadMoreMessageAction());
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