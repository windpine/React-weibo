import React from 'react';
import {Layout,Breadcrumb,Menu,Icon} from 'antd';

import MyHeader from '../../common/header/index'
import MessageList from "./component/MessageList";
import InputMessageDialog from './component/InputMessageDialog';

const{Content,Sider} = Layout;
const {SubMenu}=Menu;
function MessageUI(props){
        let content;
        if(props.isList)
            content =
                <MessageList
                    title={props.title}
                    list={props.list}
                    loadMore={props.loadMore}
                    loading={props.loading}
                    messageList={props.messageList}
                />;
        else
            content = <InputMessageDialog />;
        return(
            <div>
                <MyHeader/>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%' }}
                        >
                            <SubMenu key="sub1" title={<span><Icon type="user" />{props.siderMenuTitle}</span>}>
                                <Menu.Item key="1">{props.siderMenuSubmenu}</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Content>
                        {content}
                    </Content>
                </Layout>
            </div>
        )

}
export default MessageUI;
