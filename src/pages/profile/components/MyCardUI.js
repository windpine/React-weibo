import { Card, Icon, Avatar } from 'antd';
import React from "react";
import Button from "antd/es/button/button";
import {actionCreators} from "../store";
import {connect} from "react-redux";
import axios from "axios/index";
import {changeFollowListAction} from "../store/actionCreators";

const { Meta } = Card;
var config = {
    baseURL: 'http://localhost:8080'
};

const uid=sessionStorage.getItem('uid');
console.log("currentuid:",uid);
const path=`/profile/${uid}`;

//个人主页上方卡片
class MyCardUI extends React.Component{

    constructor(props){
        super(props);
        this.state={
            isFocus:'',

        }

    }




    handleIsFollow() {
        const uid = this.props.uid;//别人的ID
        const currentId=sessionStorage.getItem('uid');//我的ID
        const isFollow=this.props.checkResult;
        console.log("currentId:",currentId);
        console.log("uid:",uid);
        console.log("checkresult:",isFollow);
        if (uid != currentId) {//进入了别人的主页
            // this.checkIsFollow(currentId,uid);
            switch (isFollow){
                case "yes"://已经关注了
                    return(
                        <div style={{paddingRight: 10, textAlign: 'right',height:50,marginTop:-20}}>
                            <Button onClick={() => {
                                this.handleDeleteFollow(uid);
                           }}  >取消关注</Button>
                        </div>
                    )
                case "no"://没有关注
                    return(
                        <div style={{paddingRight: 10, textAlign: 'right',height:50,marginTop:-20}}>
                            <Button onClick={() => {
                                this.props.handleAddFollow(uid);
                            }}>添加关注</Button>
                        </div>
                    )
            }
        }
    }

    // checkIsFollow(){
    //     const currentId2=this.state.currentId;
    //     const uid2=this.state.uid;
    //     console.log("currentcheckId:",currentId2);
    //     console.log("followcheckId:",uid2);
    //     axios.get("/users"+"/"+currentId2+"/fans/"+uid2,config)
    //         .then(res=>{
    //             // dispatch(changeFollowListAction(result));
    //             const result=res.data.data;
    //             console.log("axiosCheckResult:",result);
    //             this.setState( {
    //                 isFocus: result
    //             } );
    //
    //         });
    // }

    // componentDidMount(){//注意：是在组件加载完毕后立即执行
    //     const uid = this.props.uid;//别人的ID
    //     const currentId=sessionStorage.getItem('uid');//我的ID
    //     console.log("currentcheckId:",currentId);
    //     console.log("followcheckId:",uid);
    //     axios.get("/users"+"/"+currentId+"/fans/"+uid,config)
    //         .then(res=>{
    //             // dispatch(changeFollowListAction(result));
    //             const result=res.data.data;
    //             console.log("axiosCheckInfo:",result);
    //             this.setState( {
    //                 isFocus: result
    //             } );
    //
    //         });
    //     console.log("state.isFocus:",this.state.isFocus);
    // }

    handleDeleteFollow(followId){
        const dataSource = [...this.props.dataSource];
        this.props.getFollowList(dataSource.filter(item => item.uid !== followId),followId);

    }

    render(){
        return(
            <Card
                style={{ textAlign: 'center',marginLeft:'10%',marginRight:'10%',backgroundColor:'grey'}}
                cover={<img alt="example" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531847584917&di=b44cf46c3557b368f47670da0a50d682&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F05%2F18%2F93%2F2959c4380ce1e49.jpg " height="200" width="200"  />}
                actions={[<Icon type="profile" spin="true">我的主页</Icon>, <Icon type="setting" tex="管理中心" spin="true">管理中心</Icon>]}
            >
                <div style={{textAlign:'center',marginTop:-80,height:70}}>
                    <Meta  style={{ textAlign: 'center',marginLeft:'40%',marginRight:'40%',width:'300px'}}
                        avatar={<Avatar style={{width:'80px',height:'80px'}} src={this.props.avatarUrl} />}
                        title={this.props.username}
                        description="欢迎访问我的主页~"
                    />
                    {this.handleIsFollow()}
                </div>

            </Card>

        )
    }
}

const mapStateToProps=(state)=>{
    return{
        dataSource:state.getIn(['profile','followsList']),
    }

}

const mapDispatchToProps=(dispatch)=>{
    return{
        handleAddFollow(uid){
            console.log("buttonClicker!");
            dispatch(actionCreators.changeIsFollow('yes'));
            dispatch(actionCreators.addFollowRequest(uid));
        },
        getFollowList(result,deleteId){
            dispatch(actionCreators.changeIsFollow('no'));
            dispatch(actionCreators.saveFollowListRequest(result,deleteId));
            console.log("result:",result);
            console.log('deleteId:',deleteId);


        },




    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyCardUI);