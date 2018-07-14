import React,{Component} from 'react';
import {Card,Row,Col,Button} from 'antd';
import 'antd/dist/antd.css'

import InputBox from "./InputBox"
import store from "../../../store";

class TweetBoxUI extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.onRef(this)
    }

    clearTweetInput=()=>{
        console.log('clearTweetInput')
        this.child.clearInput();
    }

    onRef = (ref) => {
        this.child = ref
    }

    render() {
        return(
            <div>
                <Card title="发送你的第一条微博" hoverable>
                    <Row>
                        <InputBox inputType="tweet" onRef={this.onRef}  value={this.props.value} style={{ width: '100%',height:100 } }/>
                    </Row>
                    <Row type='flex' justify="end">
                        <Button type='primary' onClick={this.props.onClick} disabled={this.props.buttonDisabled}>
                            发送
                        </Button>
                    </Row>
                </Card>
            </div>
        )
    }
}

export default TweetBoxUI