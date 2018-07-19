import React,{Component} from 'react';
import {Layout} from 'antd';
import 'antd/dist/antd.css';
import * as axios from "axios/index";
import TweetCardList from "../../home/components/TweetCardList"
import {actionCreators} from "../../home/store";
import {connect} from "react-redux";

var config = {
    baseURL: 'http://localhost:8080'
};
const {Content} = Layout;
const type="personal";

class PersonalTweetContent extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.handleGetAllTweet()

    }
    render(){
        return(
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                <TweetCardList type={type}/>
            </Content>
        )
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        handleGetAllTweet(){
            axios.get('/tweets/'+sessionStorage.getItem('uid'),config).then((res)=>{
                const result=res.data.data.tweetList;
                const action=actionCreators.changeTweetList(result);
                dispatch(action)
            })
        }
    }
}
export default  connect(null,mapDispatchToProps)(PersonalTweetContent);