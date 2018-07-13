import React from 'react';
import {Layout} from 'antd';
import 'antd/dist/antd.css'
import ProfileForm from "./ProfileForm";

const {Content}=Layout;

//todo:rightContent需要滑动条
const EditProfileContentUI=()=>{

        return(
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    <ProfileForm></ProfileForm>
            </Content>
        )

}
export default EditProfileContentUI;