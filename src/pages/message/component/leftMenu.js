import React from 'react';
import {Menu,Icon} from 'antd';
import {NavLink} from 'react-router-dom'
const LeftMenu = function(props){
    return(
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
        >
            <Menu.SubMenu key="sub1" title={<span><Icon type="user"/>{props.siderMenuTitle}</span>}>
                <Menu.Item key="1" >
                    <NavLink to='/message'>
                        {props.siderMenuSubmenu}
                    </NavLink>
                </Menu.Item>
            </Menu.SubMenu>
        </Menu>
    )
};
export default LeftMenu;