import React,{Component} from 'react';
import WelcomeUI from "./WelcomeUI";
import {withRouter} from 'react-router-dom';
import store from '../../store';
import {connect} from 'react-redux';
import {actionCreators} from "./store/";

class Welcome extends Component{

    constructor(props){
        super(props);
        store.subscribe(this.props.handleStoreChange.bind(this))
    }
    render(){
        return (
            <WelcomeUI
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


export default connect(mapStatesToProps,mapDispatchToProps)(withRouter(Welcome));