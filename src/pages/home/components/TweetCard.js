import React,{Component} from 'react'
import {connect} from 'react-redux';
import 'antd/dist/antd.css';
import { Card,Row,Col,Avatar,Icon,Divider} from 'antd';
import RepostBox from './RepostBox'
import CommentBox from './CommentBox'
const {Meta}=Card
class TweetCard extends Component{
    constructor(props){
        super(props);
    }

    state={
        RepostOrComment:0,
    }
    onRepostClick=()=>{
        if(this.state.RepostOrComment===1){
            this.setState({
                RepostOrComment:0
            })
        }
        else(
            this.setState({
                RepostOrComment:1
            })
        )
    }
    onCommentClick=()=>{
        if(this.state.RepostOrComment===2){
            this.setState({
                RepostOrComment:0
            })
        }
        else(
            this.setState({
                RepostOrComment:2
            })
        )
    }
    renderRepostOrComment=()=>{
        if(this.state.RepostOrComment===0){
            return
        }
        if(this.state.RepostOrComment===1){
            return(
                <RepostBox tid={this.props.tweetInfo.get('tid')}></RepostBox>
            )
        }
        if(this.state.RepostOrComment===2){
            return(
                <CommentBox tid={this.props.tweetInfo.get('tid')}></CommentBox>
            )
        }
    }
    render(){
        const {tweetInfo}=this.props
        console.log("没有进循环吗")
        console.log(tweetInfo)
        return(
            <div style={{marginTop:20, marginRight:20 ,marginLeft:20}}>
                <Card hoverable style={{marginTop:20}}
                      actions={[<Icon type="export" onClick={this.onRepostClick}/>,
                                <Icon type="message" onClick={this.onCommentClick}/>,
                                <Icon type="like-o"/>]}>
                    <Row>
                        <Meta
                            avatar={<Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={tweetInfo.get('uid')}
                            description={tweetInfo.get('createTime')}
                        />
                    </Row>
                    <Row style={{marginTop:20}}>
                        <Col span={2}></Col>
                        <Col span={22}>
                            <Row>
                                <p>
                                {tweetInfo.get('content')}
                                </p>
                            </Row>
                            {/*<Row>*/}
                                {/*<Divider/>*/}
                                {/*<p>*/}
                                    {/*@dsakjdlaskjdlaks:jkljlkjljlk*/}
                                {/*</p>*/}
                            {/*</Row>*/}
                        </Col>
                    </Row>
                </Card>
                {
                    this.renderRepostOrComment()
                }
            </div>
        )
    }
}

export default TweetCard;