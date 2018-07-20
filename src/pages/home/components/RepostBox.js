import React,{Component} from 'react'
import {connect} from 'react-redux';
import 'antd/dist/antd.css';
import {actionCreators} from "../store";
import RepostBoxUI from './RepostBoxUI'

class RepostBox extends Component{
    constructor(props){
        super(props);
    }
    state={
        checked:false
    }

    onClick=()=>{
        this.props.handleSendRepost(this.props.tid,this.props.uid,this.props.value,this.props.type,this.state.checked)
        this.child.clearRepostInput()
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
            <RepostBoxUI type={this.props.type} tid={this.props.tid} onChange={this.onChange} checked={this.state.checked} onRef={this.onRef} onClick={this.onClick} buttonDisabled={this.props.buttonDisabled} value={this.props.value}/>
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
        handleSendRepost(tid,uid,content,type,checked){
            dispatch(actionCreators.sendRepostAction(tid,uid,content,type,checked))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(RepostBox);