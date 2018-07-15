import React,{Component} from 'react'
import {connect} from 'react-redux';
import 'antd/dist/antd.css';
import { Card,Row,Col,Avatar,Icon,Divider,Button,Checkbox} from 'antd';
import InputBox from './InputBox'
import CommentList from './CommentList'

class CommentBox extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.onRef(this)
    }
    clearCommentInput=()=>{
        this.child.clearInput();
    }
    componentDidMount(){
        this.props.onRef(this)
    }
    onRef = (ref) => {
        this.child = ref
    }
    render(){
        return(
            <div style={{background:'#fafafa',padding:20}}>
                <div>
                    <InputBox inputType="comment" onRef={this.onRef}  value={this.props.value} style={{ width: '100%'}}/>
                    <Row style={{marginTop:10}}>
                        <Col span={20}>
                            <Row type='flex'>
                            <Checkbox  onChange={this.props.onChange} checked={this.props.checked}>同时转发到微博</Checkbox>
                            </Row>
                        </Col>
                        <Col span={4}>
                            <Row type='flex' justify="end">
                                <Button type='primary' onClick={this.props.onClick} disabled={this.props.buttonDisabled}>
                                    评论
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row>
                        <CommentList  tid={this.props.tid}/>
                    </Row>
                </div>
            </div>
        )
    }
}

export default CommentBox;