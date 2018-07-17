import React,{Component} from 'react';
import {Layout,Breadcrumb,Input} from 'antd';
import 'antd/dist/antd.css'
import MyHeader from "../../common/header";
import MyCardUI from "./components/MyCardUI";
import ProfileContentUI from "./components/ProfileContentUI";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import * as axios from "axios/index";
import {actionCreators} from "./store";


var config = {
    baseURL: 'http://localhost:8080'
};

class ProfileUI extends Component{

    constructor(props){
        super(props);
        // store.subscribe(this.props.handleStoreChange.bind(this))
        // this.state = {
        //     nickname: this.props.nickname,
        //     username:this.props.username,
        //     sex: this.props.sex,
        //     email: this.props.email,
        //     avatarUrl:this.props.avatarUrl,
        //     tweetsList:[],
        // };
    }

    componentDidMount(){//注意：是在组件加载完毕后立即执行
        const myuid=this.props.match.params.uid;
        console.log('pramisuid:',myuid);
        axios.get("/users"+"/"+myuid,config)
            .then(res=>{
                this.setState({
                    loading: false,
                });
                const result=res.data.data.user;
                console.log("pramUserInfo:",result);
                console.log("pramUserInfo:",result.password);
                this.props.getUserInfo(result,result.password);
            })
    }

    render(){
        return (
            <div>
                <MyHeader/>
                <MyCardUI username={this.props.username} avatarUrl={this.props.avatarUrl} uid={this.props.uid}/>
                <ProfileContentUI/>
            </div>
        )
    }
}

const mapStatesToProps = (state)=>{
    return {
        uid:state.getIn(['profile','uid']),
        username:state.getIn(['profile','username']),
        avatarUrl:state.getIn(['profile','avatarUrl']),
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        getUserInfo(result,password){
            dispatch(actionCreators.changeUserInfoActoin(result,password));
        }


    }
}
export default connect(mapStatesToProps,mapDispatchToProps)(withRouter(ProfileUI));