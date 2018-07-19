import React,{Component} from 'react';
import {Layout} from 'antd';
import 'antd/dist/antd.css'
import ProfileForm from "./ProfileForm";
import FollowListContent from "./FollowListContent";
import FollowListContent2 from "./FollowListContent";
import FollowerListContent from "./FollowerListContent";
import * as axios from "axios/index";
import {actionCreators} from "../store";
import {connect} from "react-redux";

const {Content}=Layout;
var config = {
    baseURL: 'http://localhost:8080'
};

//todo：通过显示关系动态图，更加有趣
//todo:使用自定义筛选表格
class FollowerListContentUI extends Component{

    constructor(props) {
        super(props);
        this.state={
            loading:false,
        }
    }

    componentDidMount(){//注意：是在组件加载完毕后立即执行
        this.setState({ loading: true });
        const myuid=sessionStorage.getItem('uid');
        axios.get("/users"+"/"+myuid+"/followers",config)
            .then(res=>{
                this.setState({
                    loading: false,
                });
                const result=res.data.data.userList;
                this.props.getFollowerListInfo(result);
            })
    }

    render(){
        return(
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                <FollowerListContent loading={this.state.loading}/>
            </Content>
        )
    }

}
const mapStateToProps=(state)=>{
    return{
    }

}

const mapDispatchToProps=(dispatch)=>{
    return{
        getFollowerListInfo(result){
            dispatch(actionCreators.changeFollowerListAction(result));
        }

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(FollowerListContentUI);