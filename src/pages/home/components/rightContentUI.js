import React,{Component} from 'react';
import {Layout} from 'antd';
import 'antd/dist/antd.css'

const {Content}=Layout;

class MyRightContentUI extends Component{
    render(){
        return(
            <Content style={{ padding: '0 24px', minHeight: 280 }}>content</Content>
        )
    }
}
export default MyRightContentUI;