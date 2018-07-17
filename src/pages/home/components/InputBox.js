import React,{Component} from 'react'
import { Mention} from 'antd';
import {connect} from 'react-redux';
import 'antd/dist/antd.css';
import {actionCreators} from "../store";
import InputBoxUI from "./InputBoxUI";
import store from "../../../store";

const REPOST="repost";
const COMMENT="comment"
const TWEET="tweet"

const { toString,toContentState} = Mention;

function onSelect(suggestion) {
    console.log('onSelect', suggestion);
}

class InputBox extends Component{
    constructor(props) {
        super(props);
        //console.log("props:  "+props.value)
    }

    componentDidMount(){
        this.props.onRef(this)
    }

    state={
        inputValue:toContentState(this.props.value)
    }

    onSearchChange = (value, trigger) => {
        //console.log('onSearchChange', value, trigger);
        return trigger === '@' ? this.props.handleMentionUsers() : this.props.handleMentionTopics();

    }
    onChange=(editorState)=>{
        this.props.handleInputBoxChange(toString(editorState),this.props.inputType)
        this.setState({
            inputValue: editorState,
        });
    }
    //由组件调用除
    clearInput=()=>{
        this.setState({
            inputValue: toContentState("")
        });
    }
    render(){
        return(
            <div>
            <InputBoxUI
                style={this.props.style}
                placeholder="input @ to mention people, # to mention tag"
                prefix={['@', '#']}
                onSearchChange={this.onSearchChange}
                suggestions={this.props.mention.toArray()}
                onSelect={onSelect}
                onChange={this.onChange}
                value={this.state.inputValue}/>
            </div>
        )

    }
}

const mapStatesToProps = (state)=>{
    return {
        mention:state.getIn(['home','mention'])
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        handleInputBoxChange(input,inputType){
            const action=actionCreators.getInputChangeAction(input,inputType);
            dispatch(action)
        },
        handleMentionUsers(){
            console.log("handleMentionUsers")
            dispatch(actionCreators.getMentionUsers())
        },
        handleMentionTopics(){
            console.log("handleMentionTopics")
            dispatch(actionCreators.getMentionTopics())
        },


    }
}


export default connect(mapStatesToProps,mapDispatchToProps)(InputBox);