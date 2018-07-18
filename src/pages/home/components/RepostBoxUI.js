import React,{Component} from 'react'
import 'antd/dist/antd.css';
import { Card,Row,Col,Avatar,Icon,Divider,Button,Checkbox} from 'antd';
import InputBox from './InputBox'
import RepostList from './RepostList'

class RepostBoxUI extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.onRef(this)
    }
    clearRepostInput=()=>{
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
                    <InputBox inputType="repost" onRef={this.onRef}  value={this.props.value} style={{ width: '100%'}}/>
                    <Row style={{marginTop:10}}>
                        <Col span={20}>
                            <Row type='flex'>
                                <Checkbox  onChange={this.props.onChange} checked={this.props.checked}>同时评论到微博</Checkbox>
                            </Row>
                        </Col>
                        <Col span={4}>
                            <Row type='flex' justify="end">
                                <Button type='primary' onClick={this.props.onClick} disabled={this.props.buttonDisabled}>
                                    转发
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row>
                        <RepostList tid={this.props.tid}/>
                    </Row>
                </div>
            </div>
        )
    }
}

export default RepostBoxUI;