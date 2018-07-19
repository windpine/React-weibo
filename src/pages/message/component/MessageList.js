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
           dispatch(actionCreators.getLoadMoreMessageAction());
           axios.get('/',getConfig(type)).then((res) => {
               let messageList = list.concat(res.data.data.messageList);
               dispatch(actionCreators.getLoadMoreMessageListAction(messageList));
           }).catch((error)=>{
               alert(error.msg);
           })
       }
    }
};

export default connect(convertStateToProps,convertDispatchToProps)(MessageList);
