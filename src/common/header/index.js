import React from 'react';
import {Layout,Menu} from 'antd';
import 'antd/dist/antd.css'
import {NavLink,withRouter,Link} from 'react-router-dom'
import {LoginButton,RegisterButton,Greeting} from './styled';
import store from '../../store';
import {connect} from 'react-redux';
import {logoutRequest} from "../../pages/welcome/store/actionCreators";

const {Header}=Layout;

const MyHeader =(props)=>{

        return(
            <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['/']}
                    style={{ lineHeight: '64px'}}
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
                    <Menu.Item key="3">我</Menu.Item>
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
                    <LoginButton onClick={props.handleLogoutBtn}>注销</LoginButton>
                    欢迎回来,{sessionStorage.getItem('username')}
                    </Greeting>
            </Header>
        )

}

const mapStatesToProps = (state)=>{
    return {
        loginState:state.getIn(['welcome','loginState']),
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {

        handleStoreChange(){
            this.setState(store.getState());
        },
        handleLogoutBtn(){
            dispatch(logoutRequest());
        }
    }
}


export default connect(mapStatesToProps,mapDispatchToProps)(withRouter(MyHeader));