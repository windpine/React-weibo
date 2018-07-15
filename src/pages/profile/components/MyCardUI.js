import { Card, Icon, Avatar } from 'antd';
import React from "react";

const { Meta } = Card;


//个人主页上方卡片
const MyCardUI=(props)=>{
    return(
        <Card
            style={{ width: '33.3%', textAlign: 'center'}}
            cover={<img alt="example" src="../../../static/logo.png" />}
            actions={[<Icon type="profile" spin="true">我的主页</Icon>, <Icon type="setting" tex="管理中心" spin="true">管理中心</Icon>]}
        >
            <div style={{textAlign:'center'}}>
                <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={props.uesrname}
                    description="This is the description"
                />
            </div>
        </Card>
    )
}

export default MyCardUI;