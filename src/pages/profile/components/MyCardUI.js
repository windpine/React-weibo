import { Card, Icon, Avatar } from 'antd';
import React from "react";
import Button from "antd/es/button/button";
import {actionCreators} from "../store";
import {connect} from "react-redux";

const { Meta } = Card;


//个人主页上方卡片
class MyCardUI extends React.Component{

    constructor(props){
        super(props);

    }

    render(){
        return(
            <Card
                style={{ textAlign: 'center',marginLeft:'10%',marginRight:'10%'}}
                cover={<img alt="example" src={this.props.avatarUrl} height="200" width="200"  />}
                actions={[<Icon type="profile" spin="true">我的主页</Icon>, <Icon type="setting" tex="管理中心" spin="true">管理中心</Icon>]}
            >
                <div style={{textAlign:'center'}}>
                    <Meta
                        avatar={<Avatar src={this.props.avatarUrl} />}
                        title={this.props.username}
                        description="This is the description"
                    />
                </div>
                <div style={{ paddingRight:10,textAlign: 'right',}}>
                    <Button onClick={()=>{this.props.handleAddFollow(this.props.uid)}}>添加关注</Button>
                </div>


                {/*<Card.Grid style={{width:'80%', textAlign:'center'}}>*/}
                {/*<div style={{textAlign:'center'}}>*/}
                {/*<Meta*/}
                {/*avatar={<Avatar src={this.props.avatarUrl} />}*/}
                {/*title={this.props.username}*/}
                {/*description="This is the description"*/}
                {/*/>*/}
                {/*</div>*/}
                {/*</Card.Grid>*/}
                {/*<Card.Grid style={{width:'20%', textAlign:'center'}}>*/}
                {/*<div style={{ paddingRight:10,textAlign: 'right',}}>*/}
                {/*<Button onClick={()=>{this.props.handleAddFollow(this.props.uid)}}>添加关注</Button>*/}
                {/*</div>*/}
                {/*</Card.Grid>*/}

            </Card>

        )
    }
}

const mapStateToProps=(state)=>{
    return{
    }

}

const mapDispatchToProps=(dispatch)=>{
    return{
        handleAddFollow(uid){
            console.log("buttonClicker!");
            dispatch(actionCreators.addFollowRequest(uid));
        }

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyCardUI);