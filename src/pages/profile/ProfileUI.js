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
console.log("currentuid:",uid);
const path=`/profile/${uid}`;

class ProfileUI extends Component{

    constructor(props){
        super(props);
        // store.subscribe(this.props.handleStoreChange.bind(this))
        // this.state = {
        //     isFollow:'',
        // };
    }

    componentDidMount(){//注意：是在组件加载完毕后立即执行
        const myuid=this.props.match.params.uid;
        const currentuid=sessionStorage.getItem('uid');
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
                this.checkIsFollow(myuid,currentuid);
            })
    }

    checkIsFollow=(myuid,currentId)=>{
        console.log("111:",currentId);
        console.log("222:",myuid);
        axios.get("/users"+"/"+currentId+"/fans/"+myuid,config)
            .then(res=>{
                // dispatch(changeFollowListAction(result));
                const result=res.data.data;
                console.log("axiosCheckInfo:",result);
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
                    <MyCardUI username={this.props.username} avatarUrl={this.props.avatarUrl} uid={this.props.uid} checkresult={this.props.isFollow}/>
                    <ProfileContentUI/>
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
        getUserInfo(result,password){
            dispatch(actionCreators.changeUserInfoActoin(result,password));
        },
        changeIsFollow(result){
            dispatch(actionCreators.changeIsFollow(result));
            console.log("change_isFollow:",result);
        }

    }
}
export default connect(mapStatesToProps,mapDispatchToProps)(withRouter(ProfileUI));