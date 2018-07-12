import React from 'react';
import {Layout,Menu,Divider} from 'antd';
import 'antd/dist/antd.css'
import {Link} from 'react-router-dom'
import {LoginButton,RegisterButton} from './styled';

const {Header}=Layout;

const MyHeader =()=>{

        return(
            <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                    <div>
                        <Link to='/welcome'>
                        <LoginButton>登陆</LoginButton>
                    </Link>
                        <Link to='/register'>
                            <RegisterButton>注册</RegisterButton>
                        </Link>
                    </div>
                </Menu>

            </Header>
        )

}
export default MyHeader;