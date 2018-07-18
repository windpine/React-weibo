import React from 'react';
import * as words from "../wordInternationalization";
import {Menu,Icon} from 'antd';

const LeftMenuUI = (props)=>{
    return(
        <Menu
            mode="inline"
            defaultSelectedKeys={['0']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
        >
            <Menu.SubMenu key="sub1" title={<span><Icon type="user"/>{words.MESSAGE_SIDER_MENU_TITLE}</span>}>
                {words.MESSAGE_SIDER_MENU_SUBMENU.map((siderMenuSubmenu,index)=>
                    <Menu.Item key={index} onClick={()=>{props.click(index)}}>
                        {siderMenuSubmenu}
                    </Menu.Item>
                )}
            </Menu.SubMenu>
        </Menu>
    )
};
export default LeftMenuUI;