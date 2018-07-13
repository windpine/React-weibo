import React,{Component} from 'react';
import {Layout,Breadcrumb,Input} from 'antd';
import 'antd/dist/antd.css'
import MyHeader from "../../common/header";
import MyCardUI from "./components/MyCardUI";
import ProfileContentUI from "./components/RightContentUI";




const ProfileUI =()=>{

    return (
        <div>
            <MyHeader/>
            <MyCardUI/>
            <ProfileContentUI/>
        </div>
    )

}
export default ProfileUI;