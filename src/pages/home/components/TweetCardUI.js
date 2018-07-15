import React,{Component} from 'react';
import {Card,Row,Col,Button} from 'antd';
import 'antd/dist/antd.css'

const TweetCardUI=(props)=>{
    return(
        <div>
            <Card>
                <Row type='flex' align='top'>
                    <Col span={4}>
                        <Avatar size="large" icon="user" />
                    </Col>
                    <Col span={20} >
                        <div>
                            <text>用户名</text>
                            <text>时间</text>
                        </div>
                        <div>
                            <text>
                                内容
                            </text>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}