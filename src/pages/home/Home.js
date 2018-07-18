import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter,Redirect} from 'react-router-dom';
import HomeUI from "./HomeUI";
import axios from 'axios'
import {actionCreators} from "./store";

var config = {
    baseURL: 'http://localhost:8080'
};

class Home extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {loginState}= this.props;
        return (
            loginState?<HomeUI/>:<Redirect to="/welcome"/>

        )
    }
    componentDidMount(){
        this.props.handleGetAllTweet()
    }
}

const mapStateToProps=(state)=>{
    return {
        loginState:state.getIn(['welcome','loginState']),
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

export default connect(mapStateToProps,mapDispatchToProps)(Home);