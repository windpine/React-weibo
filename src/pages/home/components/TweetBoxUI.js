import React,{Component} from 'react';
import {Card,Row,Col,Button} from 'antd';
import 'antd/dist/antd.css'

import InputBox from "./InputBox"

const TweetBoxUI=(props)=>{
    return(
        <div>
            <Card title="发送你的第一条微博" hoverable>
                <Row>
                    <InputBox style={{ width: '100%',height:100 }}/>
                </Row>
                <Row type='flex' justify="end">
                    <Button type='primary'>
                        发送
                    </Button>
                </Row>
            </Card>
        </div>
    )
}

export default TweetBoxUI