import React from 'react';
import {Layout} from 'antd';
import 'antd/dist/antd.css'
import ProfileForm from "./ProfileForm";

const {Content}=Layout;

const RightContentUI=()=>{

        return(
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                content
                    <ProfileForm></ProfileForm>
            </Content>
        )

}
export default RightContentUI;