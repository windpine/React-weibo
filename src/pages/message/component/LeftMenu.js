import React from 'react';
import {connect} from "react-redux";
import axios from "axios/index";

import LeftMenuUI from './LeftMenuUI'
import {actionCreators} from "../store";

import {getConfig} from "../UriConfig";
class LeftMenu extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
           <LeftMenuUI
               click={(index)=>{
                   if(this.props.loading !== true)
                       this.props.handleLoadMessage(index);
               }}
           />
        )
    }
}

const mapStatesToProps = (state)=>{
    return {
        loading:state.getIn(['message','loading']),
    }
};
const mapDispatchToProps = (dispatch)=> {
    return {
        handleLoadMessage(type) {
            let URL;
            if (type === 0)
                URL = '/mention';
            else if (type === 1)
                URL = '/comment';
            else
                URL = '/likes';
            dispatch(actionCreators.getLoadMessageAction());
            axios.get(URL, getConfig()).then((res) => {
                let messageList = res.data.data.messageList;
                dispatch(actionCreators.getLoadMessageListAction(messageList,type));
            });
        }
    }
};

export default connect(mapStatesToProps,mapDispatchToProps)(LeftMenu);