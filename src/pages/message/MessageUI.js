import React from 'react';
import {Layout,Breadcrumb} from 'antd';

import MyHeader from '../../common/header/index'
import MessageList from "./component/MessageList";
import LeftMenu from './component/LeftMenu';
import * as words from "./wordInternationalization";
const{Content,Sider} = Layout;


function MessageUI(props){
        return(
            <div>
                <MyHeader/>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>{words.MESSAGE_SIDER_MENU_TITLE}</Breadcrumb.Item>
                        <Breadcrumb.Item>{words.MESSAGE_SIDER_MENU_SUBMENU[props.messageType]}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout style={{ padding: '24px 0', background: '#fff' }}>
                        <Sider width={200} style={{ background: '#fff' }}>
                            <LeftMenu/>
                        </Sider>
                        <Content>
                            <MessageList/>
                        </Content>
                    </Layout>
                </Content>
            </div>
        )

}
export default MessageUI;
