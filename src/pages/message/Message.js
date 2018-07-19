import React,{Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import MessageUI from './MessageUI';
import {actionCreators} from "./store";
import {Redirect} from 'react-router-dom'
import {getConfig} from './UriConfig'
import * as messageType from './component/messageType'

class Message extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            this.props.loginState?<MessageUI/>: <Redirect to='/welcome'/>
        );
    }
    componentDidMount(){
        this.props.handleLoadMessage(messageType.MENTION);
    }
}
const mapStateToProps = (state)=>{
    return{
        loginState:state.getIn(['welcome','loginState'])
    }
};
const mapDispatchToProps = (dispatch)=>{
    return {
        handleLoadMessage(type){
            dispatch(actionCreators.getLoadMessageAction());
            axios.get('/',getConfig(type)).then((res) => {
                let messageList=res.data.data.messageList;
                dispatch(actionCreators.getLoadMessageListAction(messageList,type));
            }).catch((error)=>{
                alert(error.msg);
            })
        },

    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Message);