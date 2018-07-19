import { List, Avatar, Spin ,Icon} from 'antd';
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

class RepostList extends Component {
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
            this.setState({
                loading: false,
            });
            const result=res.data.data.repostList;
            this.props.handleGetRepost(result)
        });
    }

    getData = (callback) => {
        axios.get("/tweets/repost/"+this.props.tid ,config).then((res)=>{
            callback(res);
        }).catch(error => {
            this.setState({
                loading: false,
            });
        })
    }

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

    onLikeClick=()=>{
        // const TID=this.props.tweetItem.get(0).get('tid')
        // axios.put("/tweets/likes/"+TID,null,config).then((res)=>{
        //     message.info("点赞成功")
        // })

    }
    render() {
        const { loading, loadingMore, showLoadingMore } = this.state;
        const data=this.props.repostList.get(this.props.tid);
        const loadMore = showLoadingMore ? (
            <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
                {loadingMore && <Spin />}
                {!loadingMore && <a>loading more</a>}
            </div>
        ) : null;
        return (
            <List
                style={{marginLeft:20,marginRight:20}}
                loading={loading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={data}
                renderItem={item => (
                    <List.Item actions={[<Icon type="like-o" onClick={this.onLikeClick}/>]}>
                        <List.Item.Meta
                            avatar={<Avatar src={item.get('avatarUrl')} />}
                            title={<a href="#">{item.get('nickname')}</a>}
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
        repostList:state.getIn(['home','repostList'])
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        handleGetRepost(result) {
            const action = actionCreators.changeRepostList(result);
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RepostList);

