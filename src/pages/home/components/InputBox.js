import React,{Component} from 'react'
import { Mention} from 'antd';
import {connect} from 'react-redux';
import 'antd/dist/antd.css';
import {actionCreators} from "../store";
import InputBoxUI from "./InputBoxUI";
import store from "../../../store";
import {setMentionList} from "../store/actionCreators";
import axios from "axios/index";

const Nav = Mention.Nav
const REPOST="repost";
const COMMENT="comment"
const TWEET="tweet"

var config = {
    baseURL: 'http://localhost:8080'
};

const { toString,toContentState,getMentions} = Mention;

class InputBox extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.onRef(this)
    }

    state={
        inputValue:toContentState(this.props.value),
        suggestions:[]
    }

    onSearchChange = (value, trigger) => {
        //console.log('onSearchChange', value, trigger);
        // return trigger === '@' ? this.props.handleMentionUsers() : this.props.handleMentionTopics();
        if (trigger==="@"){
            this.getUserSuggestions((result)=>{
                const suggestions=result.map(suggestion=>(
                    <Nav
                        value={suggestion.username}
                        data={suggestion}
                    >
                        {suggestion.username}
                    </Nav>
                ))
                this.setState({
                    suggestions:suggestions
                })
            })
        }
        else if(trigger==="#"){
            this.getTopicSuggestions((result)=>{
                const suggestions=result.map(suggestion=>(
                    <Nav
                        value={suggestion.title}
                        data={suggestion}
                    >
                        {suggestion.title}-{suggestion.description}
                    </Nav>
                ))
                this.setState({
                    suggestions:suggestions
                })
            })
        }
    }
/*
定义两个回调函数来取到需要的建议内容
 */
    getUserSuggestions=(callback)=>{
        axios.get('/users',config).then((res)=>{
            const result=res.data.data.userList;
            callback(result)
        });
    }
    getTopicSuggestions=(callback)=>{
        axios.get('/topics',config).then((res)=>{
            const result=res.data.data.topicList;
            callback(result)
        });
    }

    onSelect=(suggestion,data)=>{
        console.log('onSelect',data);
        if(data.uid){
            this.props.handleUserMention(data)
        }
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
                placeholder={this.props.placeholder}
                prefix={['@', '#']}
                onSearchChange={this.onSearchChange}
                suggestions={this.state.suggestions}
                onSelect={this.onSelect}
                onChange={this.onChange}
                value={this.state.inputValue}/>
            </div>
        )

    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        handleInputBoxChange(input,inputType){
            const action=actionCreators.getInputChangeAction(input,inputType);
            dispatch(action)
        },
        handleUserMention(data){
            dispatch(actionCreators.getUserMentionAction(data))
        }

    }
}


export default connect(null,mapDispatchToProps)(InputBox);