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
    onusernameClick=(username)=>{
        const realusername=username.substring(1)
        this.getUID(realusername,(uid)=>{
            message.info(uid)
        })
    }
    getUID=(username,callback)=>{
        axios.get("/users/username/"+username,config).then(res=>{
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
                            <a href={`/profile/${item.data}/1`} key={index} ></a>
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
