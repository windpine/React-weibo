import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import HomeUI from "./HomeUI";
import axios from 'axios'
import {actionCreators} from "./store";
import store from "./store";

class Home extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <HomeUI/>
            </div>
        )
    }
    componentDidMount(){
        axios.get("api/Tweets.json").then((res)=>{
            const result=res.data.data;
            this.props.handleGetAllTweet(result)
        })
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        handleGetAllTweet(result){
            const action=actionCreators.changeTweetList(result);
            dispatch(action)
        }
    }
}

export default connect(null,mapDispatchToProps)(Home);