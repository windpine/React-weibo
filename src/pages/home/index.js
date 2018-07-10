import React,{Component} from 'react';
import 'antd/dist/antd.css'
import MyHeader from "../../common/header";
import MyFooter from "../../common/footer";
import MyContentUI from "./components/content";




class HomeUI extends Component{
    render(){
        return (
            <div>
                <MyHeader/>
                <MyContentUI/>
                <MyFooter/>
            </div>
        )
    }
}
export default HomeUI;