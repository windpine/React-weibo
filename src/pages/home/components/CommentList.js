import { List, Avatar, Spin ,Icon,Popconfirm,message} from 'antd';
import React,{Component} from 'react'
import {connect} from 'react-redux';
import 'antd/dist/antd.css';
import axios from "axios/index";
import {actionCreators} from "../store";
import store from "../../../store";
import {formatTime} from "../Util";

//import reqwest from 'reqwest';

//const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
var config = {
    baseURL: 'http://localhost:8080'
};

class CommentList extends Component {
    constructor(props){
        super(props);
    }
    state = {
        loading: true,
        loadingMore: false,
        showLoadingMore: false,
    }

    /*
    异步获取list
     */
    componentDidMount() {
        this.getData((res) => {
            console.log("fdsfsadfasfasfasf")
            this.setState({
                loading: false,
            });
            const result=res.data.data.commentList;
            this.props.handleGetComment(result)
        });
    }

    getData = (callback) => {
        axios.get("/comments"+"/"+this.props.tid,config).then((res)=>{
            callback(res);
        }).catch(error => {
            this.setState({
                loading: false,
            });
        })
    }
    //
    // onLoadMore = () => {
    //     this.setState({
    //         loadingMore: true,
    //     });
    //     this.getData((res) => {
    //         const data = this.state.data.concat(res.results);
    //         this.setState({
    //             data,
    //             loadingMore: false,
    //         }, () => {
    //             // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
    //             // In real scene, you can using public method of react-virtualized:
    //             // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
    //             window.dispatchEvent(new Event('resize'));
    //         });
    //     });
    // }

    //删除评论的操作

    confirm=(CID)=> {
        this.setState({
            loading: true,
        });
        this.deleteAComment(CID,(res)=>{
            this.setState({
                loading: false,
            });
            message.info("删除成功")
            this.props.handleReloadCommentList(this.props.tid);
        })
    }

    deleteAComment=(CID,callback)=>{
        axios.delete("/comments"+"/"+CID,config).then((res)=>{
            callback(res);
        }).catch(error => {
            message.info("删除失败")
            this.setState({
                loading: false,
            });
        })
    }

    render() {
        const { loading, loadingMore, showLoadingMore } = this.state;
        const data=this.props.commentList.get(this.props.tid);
        const loadMore = showLoadingMore ? (
            <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
                {loadingMore && <Spin />}
                {!loadingMore && <a >loading more</a>}
            </div>
        ) : null;
        return (
            <List
                loading={loading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={data}
                renderItem={item => (
                    <List.Item actions={item.get('uid')===sessionStorage.getItem('uid')?[<Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={()=>{this.confirm(item.get('cid'))}}><Icon type="delete"/></Popconfirm>]:[<br/>]}>
                        <List.Item.Meta
                            avatar={<Avatar src={item.get('avatarUrl')} />}
                            title={<a href="#">{item.get('username')}</a>}
                            description={item.get('content')}
                        />
                        <font size="2" color="#a9a9a9">{formatTime(item.get('createTime'))}</font>
                    </List.Item>
                )}
            />
        );
    }
}

const mapStateToProps=(state)=>{
    return {
        commentList:state.getIn(['home','commentList'])
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        handleGetComment(result){
            const action=actionCreators.changeCommentList(result);
            dispatch(action)
        },
        handleReloadCommentList(TID){
            const action=actionCreators.getCommentList(TID);
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CommentList);

