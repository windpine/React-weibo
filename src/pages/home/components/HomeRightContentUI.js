import React,{Component} from 'react';
import 'antd/dist/antd.css';
import TweetBox from  "./TweetBox"
import TweetCardList from "./TweetCardList";

const type="personal";
class HomeRightContentUI extends Component{
    render(){
        return(
            <div>
            <TweetBox/>
            <TweetCardList type={type}/>
            </div>
        )
    }

}

export default HomeRightContentUI