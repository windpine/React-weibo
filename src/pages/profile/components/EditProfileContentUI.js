import React from 'react';
import {Layout} from 'antd';
import 'antd/dist/antd.css'
import ProfileForm from "./ProfileForm";
import * as axios from "axios";
import {actionCreators} from "../store";
import {connect} from "react-redux";
import {Form} from "antd/lib/index";
import store from "../../../store";

const {Content}=Layout;

var config = {
    baseURL: 'http://localhost:8080'
};
class EditProfileContentUI extends React.Component{

    componentDidMount(){//注意：是在组件加载完毕后立即执行
        const myuid=sessionStorage.getItem('uid');
        console.log('uid',myuid);
        axios.get("/users"+"/"+myuid,config)
            .then(res=>{
                this.setState({
                    loading: false,
                });
                const result=res.data.data.user;
                const password=result.password;
                console.log("axiosUserInfo:",result);
                console.log("pwd2:",password);
                this.props.getUserInfo(result,password);
            })
    }

    constructor(props){
        super(props);

    }

    render(){
        return(
            <div>
                {/*{this.changeUserInfo()}*/}
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    <ProfileForm ></ProfileForm>
                </Content>
            </div>


        )
    }
}




const mapStateToProps=(state)=>{
    return{
    }

}

const mapDispatchToProps=(dispatch)=>{
    return{
        getUserInfo(result,password){
            console.log("编辑信息里面的getUserInfo")
            dispatch(actionCreators.changeUserInfoActoin(result,password));
        }

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditProfileContentUI);