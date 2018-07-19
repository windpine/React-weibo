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
    constructor(props) {
        super(props);
        this.state={
            loading:false,
        }
    }

    componentDidMount(){//注意：是在组件加载完毕后立即执行
        this.setState({ loading: true });
        const myuid=sessionStorage.getItem('uid');
        axios.get("/users"+"/"+myuid,config)
            .then(res=>{
                this.setState({
                    loading: false,
                });
                const result=res.data.data.user;
                const password=result.password;
                this.props.getUserInfo(result,password);
            })
    }


    render(){
        return(
            <div>
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    <ProfileForm loading={this.state.loading}></ProfileForm>
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
            dispatch(actionCreators.changeUserInfoActoin(result,password));
        }

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditProfileContentUI);