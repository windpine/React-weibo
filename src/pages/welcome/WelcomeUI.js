import React,{Component} from 'react';
import {Layout,Breadcrumb,Input} from 'antd';
import 'antd/dist/antd.css'
import MyHeader from "../../common/header";
import LoginForm from "./components/LoginForm";
import {WelcomeDiv} from "./styled";


const {Content} = Layout;


const WelcomeUI =(props)=>{
        return (
            <div>
                <MyHeader/>
                <Content style={{ padding: '0 50px'}}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>@Weibo</Breadcrumb.Item>
                    </Breadcrumb>
                    <WelcomeDiv>
                        <LoginForm
                        />
                    </WelcomeDiv>
                </Content>
            </div>
        )

}
export default WelcomeUI;