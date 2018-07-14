import React,{Component} from 'react'
import {connect} from 'react-redux';
import 'antd/dist/antd.css';
import {actionCreators} from "../store";
import TweetBoxUI from "./TweetBoxUI";
import store from "../../../store";


class TweetBox extends Component{
    constructor(props){
        super(props);
        store.subscribe(this.props.handleStoreChange.bind(this))
    }
    onClick=()=>{
        this.props.handleSendTweet()
        this.child.clearTweetInput()
    }
    onRef = (ref) => {
        this.child = ref
    }
    render(){
        console.log('value'+this.props.value)
        return(
            <TweetBoxUI onRef={this.onRef} onClick={this.onClick} buttonDisabled={this.props.buttonDisabled} value={this.props.value}/>
            )
    }
}

const mapStateToProps=(state)=>{
    return {
        buttonDisabled:state.getIn(['home','tweetButton']),
        value:state.getIn(['home','tweetInput'])
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        handleSendTweet(){
            console.log("handleSendTweet");
            dispatch(actionCreators.getSendTweetAction())
        },
        handleStoreChange(){
            this.setState(store.getState());
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TweetBox);