import React from 'react';
import {Layout,Menu,Icon} from 'antd';
import 'antd/dist/antd.css'

const {Sider}=Layout;
const {SubMenu}=Menu;

const LeftSiderUI=()=>{
    return(
        <Sider width={200} style={{ background: '#fff' }}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
            >
                <SubMenu key="sub1" title={<span><Icon type="user" />基本信息</span>}>
                    <Menu.Item key="1">关注</Menu.Item>
                    <Menu.Item key="2">粉丝</Menu.Item>
                    <Menu.Item key="3">微博</Menu.Item>
                </SubMenu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="">编辑个人资料</a>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default LeftSiderUI;