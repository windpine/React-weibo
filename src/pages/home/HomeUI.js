import React,{Component} from 'react';
import 'antd/dist/antd.css'
import MyHeader from "../../common/header";
import MyContentUI from "../../common/contents/myContentUI";




class HomeUI extends Component{
    render(){
        return (
            <div>
                <MyHeader/>
                <MyContentUI/>
            </div>
        )
    }
}
export default HomeUI;