import { List, Avatar, Button, Spin ,Row,Icon} from 'antd';
import React,{Component} from 'react'
import {connect} from 'react-redux';
import 'antd/dist/antd.css';
import axios from "axios/index";
import {actionCreators} from "../store";
import store from "../../../store";

//import reqwest from 'reqwest';

//const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

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
            const result=res.data.data;
            this.props.handleGetComment(result)
        });
    }

    getData = (callback) => {
        axios.get("api/Tweets.json").then((res)=>{
            callback(res);
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

    render() {
        const { loading, loadingMore, showLoadingMore } = this.state;
        const data=this.props.repostList.toJS();
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
                    <List.Item actions={[<Icon type="export"/>,<Icon type="like-o"/>]}>
                        <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={<a href="https://ant.design">{item.uid}</a>}
                            description={item.content}
                        />
                        <font size="2" color="#a9a9a9">{item.createTime}</font>
                    </List.Item>
                )}
            />
        );
    }
}

const mapStateToProps=(state)=>{
    return {
        buttonDisabled:state.getIn(['home','commentButton']),
        value:state.getIn(['home','commentInput']),
        repostList:state.getIn(['home','repostList'])
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        handleGetComment(result){
            const action=actionCreators.changeRepostList(result);
            dispatch(action)
        },
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RepostList);

