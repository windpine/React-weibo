import React,{Component} from 'react';
import {Layout} from 'antd';
import 'antd/dist/antd.css'

const {Footer}=Layout;

class MyFooter extends Component{
    render(){
        return(
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2016 Created by Ant UED
            </Footer>
        )
    }
}
export default MyFooter;