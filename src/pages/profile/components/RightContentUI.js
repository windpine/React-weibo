import React,{Component} from 'react';
import {Layout,Breadcrumb,Menu,Icon} from 'antd';
import 'antd/dist/antd.css'
import LeftSiderUI from "./LeftSiderUI";
import EditProfileContentUI from "./EditProfileContentUI"
import {actionCreators} from "../store";
import {connect} from "react-redux";
import Sider from "antd/es/layout/Sider";
import SubMenu from "antd/es/menu/SubMenu";
import { Tabs, Radio } from 'antd';
import FollowListContentUI from "./FollowListContentUI";



const {Content} = Layout;
const TabPane = Tabs.TabPane;

//todo:rightContent需要滑动条

class RightContentUI extends Component{
    constructor( props ) {
        super(props);
        this.state = {
            clickKey:this.props.clickKey,//记录点击的链接，进行动态加载
        };
    }


    render(){
        return (
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">首页</a></Breadcrumb.Item>
                    <Breadcrumb.Item>个人主页</Breadcrumb.Item>
                </Breadcrumb>
                <div>

                </div>
                <Layout style={{ padding: '24px 0', background: '#fff', height:'500px'}}>
                    {/*<LeftSiderUI/>*/}
                    {/*<Sider width={200} style={{ background: '#fff' }}>*/}
                        {/*sider*/}
                        {/*<Menu*/}
                            {/*mode="inline"*/}
                            {/*defaultSelectedKeys={['1']}*/}
                            {/*defaultOpenKeys={['sub1']}*/}
                            {/*style={{ height: '100%' }}*/}
                        {/*>*/}
                            {/*<SubMenu key="sub1" title={<span><Icon type="user" />基本信息</span>}>*/}
                                {/*<Menu.Item key="1">关注</Menu.Item>*/}
                                {/*<Menu.Item key="2">粉丝</Menu.Item>*/}
                                {/*<Menu.Item key="3">微博</Menu.Item>*/}

                            {/*</SubMenu>*/}
                            {/*<Menu.Item>*/}
                                {/*<a target="_blank" rel="noopener noreferrer" href="">编辑个人资料</a>*/}
                            {/*</Menu.Item>*/}
                        {/*</Menu>*/}
                        {/**/}
                    {/*</Sider>*/}
                    <Tabs
                        defaultActiveKey="2"
                        tabPosition={'left'}
                        style={{ height: '500px' }}
                    >
                        <TabPane tab="基本信息" key="1" disabled key="1"></TabPane>
                        <TabPane tab="关注" key="2"><FollowListContentUI></FollowListContentUI></TabPane>
                        <TabPane tab="粉丝" key="3">粉丝</TabPane>
                        <TabPane tab="微博" key="4">微博</TabPane>
                        <TabPane tab="编辑个人资料" key="5"><EditProfileContentUI/></TabPane>
                    </Tabs>

                </Layout>
            </Content>
        )
    }



}


const mapStateToProps=(state)=>{
    return{
        clickKey:state.getIn(['profile','clickKey']),
    }

}

const mapDispatchToProps=(dispatch)=>{
    return{
        handleModifyClick(nickname,username,sex,email){
            console.log("form_data:",nickname,username,sex,email);
            //todo:this.nickname 在哪儿声明的
            dispatch(actionCreators.saveProfileDataAction(nickname,username,sex,email))

        },
        handlePasswordSave(password){
            dispatch(actionCreators.savePasswordAction(password));
        },

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(RightContentUI);