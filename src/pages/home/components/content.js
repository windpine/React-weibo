import React,{Component} from 'react';
import {Layout,Breadcrumb,Menu,Icon} from 'antd';
import 'antd/dist/antd.css'
import MySiderUI from "./leftSiderUI";
import MyRightContentUI from "./rightContentUI"


const {Content} = Layout;


class MyContentUI extends Component{
    render(){
        return (
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                    <MySiderUI/>
                    <MyRightContentUI/>
                </Layout>
            </Content>
        )
    }
}
export default MyContentUI;