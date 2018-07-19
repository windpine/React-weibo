import React from 'react';
import {connect} from "react-redux";
import axios from "axios/index";

import LeftMenuUI from './LeftMenuUI'
import {actionCreators} from "../store";

import {getConfig} from "../UriConfig";
const LeftMenu =(props)=>{
    return(
       <LeftMenuUI
           click={(index)=>{
               if(props.loading !== true)
                   props.handleLoadMessage(index);
           }}
       />
    )

}

const mapStatesToProps = (state)=>{
    return {
        loading:state.getIn(['message','loading']),
    }
};
const mapDispatchToProps = (dispatch)=> {
    return {
        handleLoadMessage(type) {
            dispatch(actionCreators.getLoadMessageAction());
            axios.get('/', getConfig(type)).then((res) => {
                let messageList = res.data.data.messageList;
                dispatch(actionCreators.getLoadMessageListAction(messageList,type));
            }).catch((error)=>{
                alert(error.msg);
            });
        }
    }
};

export default connect(mapStatesToProps,mapDispatchToProps)(LeftMenu);