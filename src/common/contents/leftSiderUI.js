import React,{Component} from 'react';
import {Layout,Menu,Affix,Row,Col,Avatar,List,Icon} from 'antd';
import 'antd/dist/antd.css';
import {connect} from 'react-redux';

const {Sider}=Layout;
const {SubMenu}=Menu;


class LeftSiderUI extends Component{
    render(){
        const data=[{title:"个人主页",type:"user"},{title:"关注",type:"heart-o"},{title:"粉丝",type:"heart"}];
        return(
            <Sider width={200} style={{ background: '#fff'}}>
                <Affix offsetTop={20}>
                    <Row type="flex" align="middle" style={{marginLeft:20,width: '100%'}}>
                        <div >
                        <Avatar  style={{verticalAlign:"center"}} src={this.props.avatarUrl}  size="large"/>
                        <b style={{marginLeft:20,fontSize:20,verticalAlign:"center"}}>
                            {this.props.nickname}
                        </b>
                        </div>
                    </Row>
                    <Row >
                        <List
                            style={{marginLeft:25,marginTop:15}}
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item=>(
                                <List.Item>
                                    <div >
                                        <Icon type={item.type}/>
                                        <font style={{marginLeft:20}}>
                                            {item.title}
                                        </font>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </Row>
                </Affix>
            </Sider>
        )
    }
}
const mapStateToProps=(state)=>{
    return {
        avatarUrl:state.getIn(['home','avatarUrl']),
        nickname:state.getIn(['home','nickname'])
    }
}

export default connect(mapStateToProps)(LeftSiderUI);