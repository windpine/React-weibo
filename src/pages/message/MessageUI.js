import React from 'react';
import {Layout,Breadcrumb,Menu,Icon} from 'antd';

import MyHeader from '../../common/header/index'
import MessageList from "./component/MessageList";
import InputMessageDialog from './component/InputMessageDialog';
import LeftMenu from './component/leftMenu';

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
                    menu ={props.menu}
                />;
        else
            content = <InputMessageDialog />;
        return(
            <div>
                <MyHeader/>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>{props.siderMenuTitle}</Breadcrumb.Item>
                        <Breadcrumb.Item>{props.siderMenuSubmenu[0]}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout style={{ padding: '24px 0', background: '#fff' }}>
                        <Sider width={200} style={{ background: '#fff' }}>
                            <LeftMenu
                                siderMenuTitle={props.siderMenuTitle}
                                siderMenuSubmenu={props.siderMenuSubmenu}
                            />
                        </Sider>
                        <Content>
                            {content}
                        </Content>
                    </Layout>
                </Content>
            </div>
        )

}
export default MessageUI;
