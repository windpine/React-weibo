import React,{Component} from 'react';
import 'antd/dist/antd.css'
import MyHeader from "../../common/header";
import MyFooter from "../../common/footer";
import MyContentUI from "../../common/contents/myContentUI";




class HomeUI extends Component{
    render(){
        return (
            <div>
                <MyHeader/>n
                <MyContentUI/>
            </div>
        )
    }
}
export default HomeUI;