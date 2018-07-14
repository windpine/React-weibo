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

//todo:rightContent需要滑动条
class EditProfileContentUI extends React.Component{
    // componentDidMount(){//注意：是在组件加载完毕后立即执行
    //     this.getUserInfo((res)=>{
    //         // const result=JSON.parse(JSON.stringify(res.data));
    //         this.setState({
    //             loading: false,
    //         });
    //         const result=res.data.data;
    //         const password=res.data.password;
    //         console.log("userinfoResult2:",result);
    //         console.log("pwd2:",password);
    //         this.props.getUserInfo(result,password);
    //         return(
    //             <Content style={{ padding: '0 24px', minHeight: 280 }}>
    //                 content
    //                 <ProfileForm ></ProfileForm>
    //             </Content>
    //         )
    //     })
    // }
    getUserInfo(callback){
        axios.get("api/userInfo.json").then((res)=>{
            callback(res);
        })
    }
    componentDidMount(){//注意：是在组件加载完毕后立即执行
        this.getUserInfo((res)=>{
            // const result=JSON.parse(JSON.stringify(res.data));
            this.setState({
                loading: false,
            });
            const result=res.data.data;
            const password=res.data.password;
            console.log("userinfoResult2:",result);
            console.log("pwd2:",password);
            this.props.getUserInfo(result,password);

        })
    }

    constructor(props){
        super(props);



    }

    // changeUserInfo=()=>{
    //     axios.get('/api/UserInfo.json').then((res)=>{
    //         const result=res.data.data;
    //         const password=res.data.password;
    //         console.log("userinfoResult2:",result);
    //         console.log("pwd2:",password);
    //         this.props.getUserInfo(result,password);
    //         this.contentInfo;
    //         return(
    //             <Content style={{ padding: '0 24px', minHeight: 280 }}>
    //                 content
    //                 <ProfileForm ></ProfileForm>
    //             </Content>
    //         )
    //
    //     });
    //
    // }

    // contentInfo=()=>{
    //     return(
    //         <Content style={{ padding: '0 24px', minHeight: 280 }}>
    //             content
    //             <ProfileForm ></ProfileForm>
    //         </Content>
    //     )
    // }

    render(){
        return(
            <div>
                {/*{this.changeUserInfo()}*/}
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    输入空值将默认存储为最新修改记录
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
            dispatch(actionCreators.changeUserInfoActoin(result,password));
        }

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditProfileContentUI);