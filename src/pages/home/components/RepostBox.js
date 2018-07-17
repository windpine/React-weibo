import React,{Component} from 'react'
import {connect} from 'react-redux';
import 'antd/dist/antd.css';
import { Card,Row,Col,Avatar,Icon,Divider} from 'antd';
import InputBox from './InputBox'
import RepostList from './RepostList'
import {actionCreators} from "../store";
import store from "../../../store";
import RepostBoxUI from './RepostBoxUI'
import {message} from "antd/lib/index";

class RepostBox extends Component{
    constructor(props){
        super(props);
    }
    state={
        checked:false
    }

    onClick=()=>{
        message.info('This is a normal message');
        this.props.handleSendComment()
        this.child.clearCommentInput()
    }
    onRef = (ref) => {
        this.child = ref
    }

    onChange = (e) => {
        console.log('checked = ', e.target.checked);
        this.setState({
            checked: e.target.checked,
        });
    }

    render(){
        return(
            <RepostBoxUI onChange={this.onChange} checked={this.state.checked} onRef={this.onRef} onClick={this.onClick} buttonDisabled={this.props.buttonDisabled} value={this.props.value}/>
            )
    }
}

const mapStateToProps=(state)=>{
    return {
        buttonDisabled:state.getIn(['home','repostButton']),
        value:state.getIn(['home','repostInput'])
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        handleSendRepost(){
            dispatch(actionCreators.sendRepostAction())
        },
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(RepostBox);