import React,{Component} from 'react';
import {Layout,Breadcrumb,Menu,Icon} from 'antd';
import 'antd/dist/antd.css'
import LeftSiderUI from "./LeftSiderUI";
import RightContentUI from "./RightContentUI"


const {Content} = Layout;


const ProfileContentUI=()=>{
        return (
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">首页</a></Breadcrumb.Item>
                    <Breadcrumb.Item>个人主页</Breadcrumb.Item>
                </Breadcrumb>
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                    <LeftSiderUI/>
                    <RightContentUI/>
                </Layout>
            </Content>
        )
}
export default ProfileContentUI;