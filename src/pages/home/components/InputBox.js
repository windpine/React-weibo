import React,{Component} from 'react'
import { Mention } from 'antd';
import {connect} from 'react-redux';
import 'antd/dist/antd.css';
import {actionCreators} from "../store";
import InputBoxUI from "./InputBoxUI";


function onSelect(suggestion) {
    console.log('onSelect', suggestion);
}

const users = ['afc163', 'benjycui', 'yiminghe', 'jljsj33', 'dqaria', 'RaoHai'];
const tags = ['1.0', '2.0', '3.0'];

class InputBox extends Component{
    constructor(props) {
        super(props);
        //store.subscribe(this.props.handleInputBoxChange.bind(this))
    }

    onSearchChange = (value, trigger) => {
        console.log('onSearchChange', value, trigger);
        const dataSource = trigger === '@' ? this.props.getMentionUsers() : tags;
        this.setState({
            suggestions: dataSource.filter(item => item.indexOf(value) !== -1),
        });
    }


    onChange(editorState){
        console.log(Mention.toString(editorState))
        return Mention.toString(editorState)
    }

    render(){
        return(
            <InputBoxUI
                style={this.props.style}
                placeholder="input @ to mention people, # to mention tag"
                prefix={['@', '#']}
                onSearchChange={this.onSearchChange}
                suggestions={this.suggestions}
                onSelect={onSelect}
                onChange={(editorState)=>{return this.props.handleInputBoxChange(this.onChange(editorState))}}
/>
        )

    }
}

const mapStatesToProps = (state)=>{
    return {
        users:state.users,
        tags:state.tags
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        handleInputBoxChange(input){
            const action=actionCreators.getInputChangeAction(input);
            dispatch(action)
        },
        handleMentionUsers(){
            dispatch(actionCreators.getMentionUsers())
        }

    }
}


export default connect(mapStatesToProps,mapDispatchToProps)(InputBox);