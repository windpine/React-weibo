import React,{Component} from 'react';
import {Layout} from 'antd';
import 'antd/dist/antd.css'
import ProfileForm from "./ProfileForm";
import FollowListContent from "./FollowListContent";
import FollowListContent2 from "./FollowListContent";
import FollowerListContent from "./FollowerListContent";

const {Content}=Layout;

//todo：通过显示关系动态图，更加有趣
//todo:使用自定义筛选表格
class FollowerListContentUI extends Component{

    render(){
        return(
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                <FollowerListContent/>
            </Content>
        )
    }

}
export default FollowerListContentUI;