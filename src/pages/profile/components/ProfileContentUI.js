import React,{Component} from 'react';
import {Layout,Breadcrumb,Menu,Icon} from 'antd';
import 'antd/dist/antd.css'
import EditProfileContentUI from "./EditProfileContentUI"
import {actionCreators} from "../store";
import {connect} from "react-redux";
import { Tabs, Radio } from 'antd';
import FollowListContentUI from "./FollowListContentUI";
import FollowerListContentUI from "./FollowerListContentUI";



const {Content} = Layout;
const TabPane = Tabs.TabPane;

class ProfileContentUI extends Component{
    constructor( props ) {
        super(props);
        this.state = {
        };
    }

    handleUserInfo(){//注意：是在组件加载完毕后立即执行
        const uid=this.props.clickUid;
        console.log("clickUid:",uid);
        if(uid==sessionStorage.getItem('uid')){
            return(
                <Layout style={{ padding: '24px 0', background: '#fff', height:'900px'}}>
                    <Tabs
                        size="large"
                        disabled key="2"
                        defaultActiveKey={this.props.activeKey}
                        tabPosition={'left'}
                        style={{ height: '900px'}}
                    >

                        <TabPane tab="微博" key="1">微博</TabPane>
                        <TabPane tab="--基本信息--" key="2" disabled key="2"></TabPane>
                        <TabPane tab="关注" key="3"><FollowListContentUI/></TabPane>
                        <TabPane tab="粉丝" key="4"><FollowerListContentUI/></TabPane>
                        <TabPane tab="编辑个人资料" key="5"><EditProfileContentUI/></TabPane>
                    </Tabs>

                </Layout>
            );
        }else{
            return(
                <Layout style={{ padding: '24px 0', background: '#fff', height:'900px'}}>
                    <Tabs
                        defaultActiveKey="1"
                        tabPosition={'left'}
                        style={{ height: '900px' }}
                    >
                        <TabPane tab="微博" key="1">微博</TabPane>
                    </Tabs>

                </Layout>
            )
        }
    }


    render(){
        return (
            <Content style={{marginLeft:'10%',marginRight:'10%'}}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>个人主页</Breadcrumb.Item>
                </Breadcrumb>
                {this.handleUserInfo()}
            </Content>
        )
    }



}


const mapStateToProps=(state)=>{
    return{
        clickUid:state.getIn(['profile','uid']),
        activeKey:state.getIn(['profile','activeKey']),
    }

}

const mapDispatchToProps=(dispatch)=>{
    return{
        handleModifyClick(nickname,username,sex,email){
            dispatch(actionCreators.saveProfileDataAction(nickname,username,sex,email))

        },
        handlePasswordSave(password){
            dispatch(actionCreators.savePasswordAction(password));
        },

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ProfileContentUI);