import React from 'react';
import {Menu,Icon} from 'antd';
import {NavLink} from 'react-router-dom'
const LeftMenu = function(props){
    return(
        <Menu
            mode="inline"
            defaultSelectedKeys={['0']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
        >
            <Menu.SubMenu key="sub1" title={<span><Icon type="user"/>{props.siderMenuTitle}</span>}>
                {props.siderMenuSubmenu.map((siderMenuSubmenu,index)=>
                    <Menu.Item key={index} onClick={()=>{props.click(index)}}>
                            {siderMenuSubmenu}
                    </Menu.Item>
                )}
            </Menu.SubMenu>
        </Menu>
    )
};
export default LeftMenu;