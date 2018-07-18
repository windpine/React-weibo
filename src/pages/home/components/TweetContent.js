import React,{Component} from 'react';
import {connect} from 'react-redux';
import {ContentSplit} from "../Util";
import axios from "axios";
import {message} from "antd/lib/index";

var config = {
    baseURL: 'http://localhost:8080'
};
class TweetContent extends Component{
    constructor(props){
        super(props);
    }
    onNicknameClick=(nickname)=>{
        const realnickname=nickname.substring(1)
        this.getUID(realnickname,(uid)=>{
            message.info(uid)
        })
    }
    getUID=(nickname,callback)=>{
        axios.get("/users/nickname/"+nickname,config).then(res=>{
            callback(res.data.data.uid)
        })
    }
    render(){
        const format=ContentSplit(this.props.content)
        return(
            <font-face>
            {
                format.map((item,index)=>{
                    if(item.type==="user"){
                        return(
                            <a key={index}  onClick={()=>{this.onNicknameClick(item.data)}}> {item.data} </a>
                        )
                    }
                    else if(item.type==="topic"){
                        return(
                            <a key={index} > {item.data} </a>
                        )
                    }
                    else{
                        return(
                            <font key={index}>{item.data}</font>
                        )
                    }
                })
            }
            </font-face>
        )

    }
}

// export function formatItem(item){
//     if(item.type==="user"){
//         return(
//             <a href="#">{item.data}</a>
//         )
//     }
//     else if(item.type==="topic"){
//         return(
//             <a href="#">{item.data}</a>
//         )
//     }
//     else{
//         return(
//             <font>{item.data}</font>
//         )
//     }
// }

export default TweetContent;
