import React,{Component} from 'react';
import * as profile from './actionTypes';

import store from '../../store';
import {connect} from 'react-redux';
import {actionCreators} from "./store/";
import ProfileUI from "./ProfileUI";

class Profile extends Component{

    constructor(props){
        super(props);
        store.subscribe(this.props.handleStoreChange.bind(this))
    }
    render(){
        return (
            <ProfileUI
                inputValue={this.props.inputValue}
                handleInputChange={this.props.handleInputChange}/>
        )
    }
}

const mapStatesToProps = (state)=>{
    return {
        inputValue:state.getIn(['welcome','inputValue'])
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        handleInputChange(e){
            dispatch(actionCreators.getInputValueAction(e.target.value));
        },
        handleStoreChange(){
            this.setState(store.getState());
        }
    }
}


export default connect(mapStatesToProps,mapDispatchToProps)(Welcome);