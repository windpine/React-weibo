import React,{Component} from 'react';
import {connect} from 'react-redux';
import {ContentSplit} from "../Util";



class TweetContent extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const format=ContentSplit(this.props.content)
        return(
            <p>
            {
                format.map((item,index)=>{
                    if(item.type==="user"){
                        return(
                            <a key={index} href="#"> {item.data} </a>
                        )
                    }
                    else if(item.type==="topic"){
                        return(
                            <a key={index}href="#"> {item.data} </a>
                        )
                    }
                    else{
                        return(
                            <font key={index}>{item.data}</font>
                        )
                    }
                })
            }
            </p>
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
