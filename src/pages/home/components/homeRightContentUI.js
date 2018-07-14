import React,{Component} from 'react';
import 'antd/dist/antd.css';
import TweetBox from  "./TweetBox"
import TweetCardList from "./TweetCardList";

class HomeRightContentUI extends Component{
    render(){
        return(
            <div>
            <TweetBox/>
            <TweetCardList/>
            </div>
        )
    }

}

export default HomeRightContentUI