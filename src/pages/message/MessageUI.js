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
                    messageType={props.messageType}
                />;
        else
            content = <InputMessageDialog />;
        return(
            <div>
                <MyHeader/>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>{props.siderMenuTitle}</Breadcrumb.Item>
                        {()=> {
                            switch (props.messageType) {
                                case 0:
                                    return <Breadcrumb.Item>{props.siderMenuTitle[0]}</Breadcrumb.Item>
                                case 1:
                                    return <Breadcrumb.Item>{props.siderMenuTitle[1]}</Breadcrumb.Item>
                                case 2:
                                    return <Breadcrumb.Item>{props.siderMenuTitle[2]}</Breadcrumb.Item>
                                default:
                                    null;
                            }}
                        }

                    </Breadcrumb>
                    <Layout style={{ padding: '24px 0', background: '#fff' }}>
                        <Sider width={200} style={{ background: '#fff' }}>
                            <LeftMenu
                                siderMenuTitle={props.siderMenuTitle}
                                siderMenuSubmenu={props.siderMenuSubmenu}
                                click={props.click}
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
