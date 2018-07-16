import React from 'react'
import {Spin,Button} from 'antd'
import {MyMessageList,MySpan,RightButton,MyIcon} from './styled'
import  * as messageType from './messageType';
import store from '../../../store'
import * as words from "../wordInternationalization";
import MessageListUI from './MessageListUI';
import{connect} from 'react-redux'
import axios from 'axios';
import {config} from "../UriConfig";
import{getData} from '../Message'



function getDataButton(obj){
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
    }
class MessageList extends React.Component{
    constructor(props){
        super(props);
      //  store.subscribe(this.props.handleStoreChange.bind(this))
    }
    render(){
        const loadMore = this.props.showLoadingMore ? (
            <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
                {this.props.loadingMore && <Spin />}
                {!this.props.loadingMore && <Button onClick={()=>{getDataButton(this)}}>{words.MESSAGE_LOAD_MORE_BUTTON}</Button>}
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
}
const convertDispatchToProps = (dispatch) =>{
    return {
        handleStoreChange() {
            this.setState(store.getState(),() => {
                // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                // In real scene, you can using public method of react-virtualized:
                // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
                window.dispatchEvent(new Event('resize'));
            })
        }
    }
}

export default connect(convertStateToProps,convertDispatchToProps)(MessageList);
