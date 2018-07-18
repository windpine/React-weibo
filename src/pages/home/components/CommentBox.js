import React,{Component} from 'react'
import {connect} from 'react-redux';
import 'antd/dist/antd.css';
import {message} from 'antd';
import CommentBoxUI from './CommentBoxUI'
import store from "../../../store";
import {actionCreators} from "../store";

class CommentBox extends Component{
    constructor(props){
        super(props);
    }

    state={
        checked:false
    }

    onClick=()=>{
        message.info('This is a normal message');
        this.props.handleSendComment(this.props.tid,this.props.uid,this.props.value)
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
            <CommentBoxUI tid={this.props.tid} onChange={this.onChange} checked={this.state.checked} onRef={this.onRef} onClick={this.onClick} buttonDisabled={this.props.buttonDisabled} value={this.props.value}/>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        buttonDisabled:state.getIn(['home','commentButton']),
        value:state.getIn(['home','commentInput'])
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        handleSendComment(tid,uid,content){
            dispatch(actionCreators.sendCommentAction(tid,uid,content))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)( CommentBox);