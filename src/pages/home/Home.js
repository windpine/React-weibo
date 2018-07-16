import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import HomeUI from "./HomeUI";
import axios from 'axios'
import {actionCreators} from "./store";
import store from "./store";

var config = {
    baseURL: 'http://localhost:8080'
};

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
        this.props.handleGetAllTweet()
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        handleGetAllTweet(){
            axios.get('/tweets',config).then((res)=>{
                const result=res.data.data.tweetList;
                const action=actionCreators.changeTweetList(result);
                dispatch(action)
            })
        }
    }
}

export default connect(null,mapDispatchToProps)(Home);