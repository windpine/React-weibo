import React,{Component} from 'react';
import {Card,Row,Col,Button} from 'antd';
import 'antd/dist/antd.css'

import InputBox from "./InputBox";
import Avatar from "./Upload";

class TweetBoxUI extends Component{
    constructor(props){
        super(props);
    }

    clearTweetInput=()=>{
        console.log('clearTweetInput')
        this.child.clearInput();
    }

    onRef = (ref) => {
        this.child = ref
    }
    componentDidMount(){
        this.props.onRef(this)
    }

    render() {
        return(
            <div>
                <Card hoverable style={{marginLeft:20,marginRight:20}}>
                    <Row style={{marginBottom:10}}><font size="3" color="#000">发送你的第一条微博</font></Row>
                    <Row>
                        <InputBox inputType="tweet" onRef={this.onRef}  value={this.props.value} style={{ width: '100%',height:100 }} placeholder="input @ to mention people, # to mention tag"/>
                    </Row>
                    <Row type='flex'  align="top" style={{marginTop:10}}>
                        <Col span={12}>
                            <Row type='flex' justify="start">
                                <Avatar/>
                            </Row>
                        </Col>
                        <Col span={12} >
                            <Row type='flex' justify="end">
                            <Button  type='primary' onClick={this.props.onClick} disabled={this.props.buttonDisabled}>
                                发送
                            </Button>
                            </Row>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}

export default TweetBoxUI