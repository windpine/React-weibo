import React from 'react';
import {Layout,Breadcrumb,Menu,Icon} from 'antd';

import MyHeader from '../../common/header/index'
import MessageList from "./component/MessageList";
import InputMessageDialog from './component/InputMessageDialog';
import LeftMenu from './component/leftMenu';
import * as messageType from'./component/messageType';
import * as words from "./wordInternationalization";
const{Content,Sider} = Layout;
const {SubMenu}=Menu;

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
                            <LeftMenu
                                click={props.click}
                            />
                        </Sider>
                        <Content>
                            <MessageList
                                title={props.title}
                                list={props.list}
                                loading={props.loading}
                                messageList={props.messageList}
                                messageType={props.messageType}
                            />
                        </Content>
                    </Layout>
                </Content>
            </div>
        )

}
export default MessageUI;
