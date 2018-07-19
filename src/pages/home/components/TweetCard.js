import React,{Component} from 'react'
import 'antd/dist/antd.css';
import { Card,Row,Col,Avatar,Icon,message,Divider} from 'antd';
import RepostBox from './RepostBox'
import CommentBox from './CommentBox'
import TweetContent from './TweetContent'
import SubContent from './SubContent'
import axios from 'axios'
import {formatTime} from "../Util";
import {Redirect} from 'react-router-dom';

var config = {
    baseURL: 'http://localhost:8080'
};
const {Meta}=Card

class TweetCard extends Component{
    constructor(props){
        super(props);
    }

    state={
        RepostOrComment:0,
        likes:this.props.tweetItem.get(0).get('likes')
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
    onLikeClick=()=>{
        this.setState({
            likes:this.state.likes+1
        })
        const TID=this.props.tweetItem.get(0).get('tid')
        axios.put("/tweets/likes/"+TID,null,config).then((res)=>{
            message.info("点赞成功")
        })

    }

    renderRepostOrComment=()=>{
        if(this.state.RepostOrComment===0){
            return
        }
        if(this.state.RepostOrComment===1){
            return(
                <RepostBox type={this.props.type} tid={this.props.tweetItem.get(0).get('tid')} uid={this.props.tweetItem.get(0).get('uid')}></RepostBox>
            )
        }
        if(this.state.RepostOrComment===2){
            return(
                <CommentBox  type={this.props.type} tid={this.props.tweetItem.get(0).get('tid')} uid={this.props.tweetItem.get(0).get('uid')}></CommentBox>
            )
        }
    }

    renderContent=()=>{
        const {tweetItem}=this.props;
        if(tweetItem.size===1){
            return (
                <div>
                    <TweetContent content={tweetItem.get(0).get('content')}/>
                    {
                        tweetItem.get(0).get('imageUrl')&&
                            <p>
                            <img src={tweetItem.get(0).get('imageUrl')} width='20%'></img>
                            </p>
                    }
                </div>
            )
        }
        else{
            return(
                <font-face>
                    {
                        tweetItem.map((item, index) => {
                            return <SubContent onClick={this.onUserClick} key={index} item={item} size={tweetItem.size} index={index}/>
                        })
                    }
                </font-face>
            )
        }
    }
    // onUserClick=(UID)=>{
    //     const path="profile/"+UID+"/1"
    //     console.log(path)
    //     return(
    //         <Redirect to={path}/>
    //     )
    // }
    render(){
        const tweetInfo=this.props.tweetItem.get(0);
        const {tweetItem}=this.props;
        return(
            <div style={{marginTop:20, marginRight:20 ,marginLeft:20}}>
                <Card hoverable style={{marginTop:20}}
                      actions={[<div><Icon type="export" onClick={this.onRepostClick}/>{tweetInfo.get('forwards')? tweetInfo.get('forwards'):''}</div>,
                                <div><Icon type="message" onClick={this.onCommentClick}/>{tweetInfo.get('comments')? tweetInfo.get('comments'):''}</div>,
                                <div><Icon type="like-o" onClick={this.onLikeClick}/>{this.state.likes? this.state.likes: ''}</div>]}>
                    <Row>
                        <Meta
                            avatar={<a href={`/profile/${tweetInfo.get('uid')}/1`}><Avatar size="large" src={tweetInfo.get('avatarUrl')}/></a>}
                            title={<a href={`/profile/${tweetInfo.get('uid')}/1`}>{tweetInfo.get('username')}</a>}
                            description={formatTime(tweetInfo.get('createTime'))}
                        />
                    </Row>
                    <Row style={{marginTop:20}}>
                        <Col span={2}></Col>
                        <Col span={22}>
                            <Row>
                                {
                               this.renderContent()
                                }
                            </Row>
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