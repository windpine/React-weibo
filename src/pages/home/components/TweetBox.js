import React,{Component} from 'react'
import {connect} from 'react-redux';
import 'antd/dist/antd.css';
import {actionCreators} from "../store";
import TweetBoxUI from "./TweetBoxUI";
import InputBoxUI from "./InputBoxUI";


class TweetBox extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <TweetBoxUI/>
            )
    }
}
export default TweetBox;