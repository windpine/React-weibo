import React from 'react';
import {Layout,Menu} from 'antd';
import 'antd/dist/antd.css'
import {NavLink,withRouter,Link} from 'react-router-dom'
import {LoginButton,RegisterButton,Greeting} from './styled';
import store from '../../store';
import {connect} from 'react-redux';
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
                    <Menu.Item key="2">消息</Menu.Item>
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
                    欢迎回来,{props.username}
                    </Greeting>
            </Header>
        )

}

const mapStatesToProps = (state)=>{
    return {
        loginState:state.getIn(['welcome','loginState']),
        username:state.getIn(['welcome','login','username'])
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        handleStoreChange(){
            this.setState(store.getState());
        }
    }
}


export default connect(mapStatesToProps,mapDispatchToProps)(withRouter(MyHeader));