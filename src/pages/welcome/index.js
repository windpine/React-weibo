import React,{Component} from 'react';
import {Layout,Breadcrumb} from 'antd';
import 'antd/dist/antd.css'
import MyHeader from "../../common/header";
import MyFooter from "../../common/footer";


const {Content} = Layout;


class WelcomeUI extends Component{
    render(){
        return (
            <div>
                <MyHeader/>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
                </Content>
                <MyFooter/>
            </div>
        )
    }
}
export default WelcomeUI;