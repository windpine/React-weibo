import React from 'react';
import {Layout} from 'antd';
import 'antd/dist/antd.css'

const {Footer}=Layout;

const MyFooter =()=>{
        return(
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2016 Created by Ant UED
            </Footer>
        )

}
export default MyFooter;