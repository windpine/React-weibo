import React,{Component} from 'react';
import {Layout,Menu} from 'antd';
import 'antd/dist/antd.css'
import {NavLink,withRouter,Redirect,Link} from 'react-router-dom'
import {LoginButton,RegisterButton,Greeting} from './styled';
import store from '../../store';
import {connect} from 'react-redux';
import {logoutRequest} from "../../pages/welcome/store/actionCreators";
import Avatar from "antd/es/avatar/index";
import * as axios from "axios/index";
import {actionCreators} from "../../pages/home/store";

const {Header}=Layout;

var config = {
    baseURL: 'http://localhost:8080'
};

class MyHeader extends Component {

    constructor(props){
        super(props)

    }
    render(){
        const props = this.props;
        var path=sessionStorage.getItem('uid')?`/profile/${sessionStorage.getItem('uid')}/1`:`/profile/${this.props.uid}/1`;
        var avatarUrl=sessionStorage.getItem('avatarUrl')?sessionStorage.getItem('avatarUrl'):this.props.avatarUrl;
        return(
            <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['/']}
                    style={{ lineHeight: '64px'}}
                    selectable={false}
                >
                    <Menu.Item key="1">
                        <NavLink to='/home'>
                            首页
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <NavLink to='/message'>
                            消息
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="3" >
                        <div style={props.loginState?{visibility:'visible'}:{visibility:'hidden'}}>
                            <a href={path}>
                                <Avatar src={avatarUrl}></Avatar>
                                {sessionStorage.getItem('username')}
                            </a>

                        </div>
                    </Menu.Item>
                </Menu>

                <div style={props.loginState?{visibility:'hidden'}:{visibility:'visible'}}>
                    <Link to='/welcome'>
                        <LoginButton>登陆</LoginButton>
                    </Link>
                    <Link to='/register'>
                        <RegisterButton>注册</RegisterButton>
                    </Link>
                </div>
                <Greeting style={props.loginState?{visibility:'visible'}:{visibility:'hidden'}}>
                    <LoginButton onClick={props.handleLogoutBtn.bind(this)}>注销</LoginButton>
                    欢迎回来,{sessionStorage.getItem('username')}
                </Greeting>
            </Header>
        )
    }




}

const mapStatesToProps = (state)=>{
    return {
        loginState:state.getIn(['welcome','loginState']),
        avatarUrl:state.getIn(['profile','avatarUrl']),
        uid:state.getIn(['welcome','sessionUid']),
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {

        handleStoreChange(){
            this.setState(store.getState());
        },
        handleLogoutBtn(){
            dispatch(logoutRequest());
            console.log('测试跳转')

        },
        getUserInfo(result,password){
            dispatch(actionCreators.changeUserInfoActoin(result,password));
        },
    }
}


export default connect(mapStatesToProps,mapDispatchToProps)(withRouter(MyHeader));