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
import Redirect from "react-router-dom/es/Redirect";


var config = {
    baseURL: 'http://localhost:8080'
};

const uid=sessionStorage.getItem('uid');
const path=`/profile/${uid}`;

class ProfileUI extends Component{

    constructor(props){
        super(props);
        // store.subscribe(this.props.handleStoreChange.bind(this))
        // this.state = {
        //     isFollow:'',
        // };
    }

    componentWillMount(){//注意：是在组件加载完毕后立即执行
        const myuid=this.props.match.params.uid;
        const currentuid=sessionStorage.getItem('uid');
                axios.get("/users"+"/"+myuid,config)
            .then(res=>{
                this.setState({
                    loading: false,
                });
                const result=res.data.data.user;
                               this.props.getUserInfo(result,result.password,this.props.match.params.key);
                this.checkIsFollow(myuid,currentuid);
            })
    }

    checkIsFollow=(myuid,currentId)=>{

        axios.get("/users"+"/"+currentId+"/fans/"+myuid,config)
            .then(res=>{
                // dispatch(changeFollowListAction(result));
                const result=res.data.data;

                // this.setState({
                //     isFollow:result,
                // });
                this.props.changeIsFollow(result);

            });

    }

    render(){
        return (

            this.props.loginState?(
                <div>
                    <MyHeader/>
                    <MyCardUI username={this.props.username} avatarUrl={this.props.avatarUrl} uid={this.props.match.params.uid} checkResult={this.props.isFollow}/>
                    <ProfileContentUI uid={this.props.match.params.uid}/>
                </div>
            ): <Redirect to='/welcome'/>

        )
    }
}

const mapStatesToProps = (state)=>{
    return {
        uid:state.getIn(['profile','uid']),
        username:state.getIn(['profile','username']),
        avatarUrl:state.getIn(['profile','avatarUrl']),
        isFollow:state.getIn(['profile','isFollow']),
        loginState:state.getIn(['welcome','loginState']),
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        getUserInfo(result,password,key){
            console.log("个人主页的get userinfo")
            dispatch(actionCreators.changeUserInfoActoin(result,password,key));
        },
        changeIsFollow(result){
            dispatch(actionCreators.changeIsFollow(result));

        }

    }
}
export default connect(mapStatesToProps,mapDispatchToProps)(withRouter(ProfileUI));