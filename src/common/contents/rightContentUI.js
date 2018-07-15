import React,{Component} from 'react';
import {Layout} from 'antd';
import 'antd/dist/antd.css'
import HomeRightContentUI from "../../pages/home/components/homeRightContentUI"

const {Content}=Layout;

class MyRightContentUI extends Component{
    render(){
        return(
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                <HomeRightContentUI/>
            </Content>

        )
    }
}
export default MyRightContentUI;