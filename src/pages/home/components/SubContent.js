import React,{Component} from 'react'
import 'antd/dist/antd.css';
import { Row,Divider} from 'antd';
import {formatTime} from "../Util";

import TweetContent from './TweetContent'

const SubContent=(props)=>{
    if(props.index===0){
        return (
            <TweetContent content={props.item.get('content')}/>
        )
    }
    else if(props.index===(props.size-1)){
        return(
            <div>
                <Divider/>
                <Row ><a href={`/profile/${props.item.get('uid')}/1`}>@{props.item.get('username')}</a></Row>
                <Row>{formatTime(props.item.get('createTime'))}</Row>
                <p><TweetContent content={props.item.get('content')}/></p>
                <p>
                    <img src={props.item.get('imageUrl')} width='20%'></img>
                </p>
            </div>
        )
    }
    else{
        return(
            <font-face>
                //<a heaf="#"  onClick={()=>{props.onClick(props.item.get('uid'))}}>@{props.item.get('username')}</a>：{props.item.get('content')}
            </font-face>
        )
    }
}

export default SubContent;