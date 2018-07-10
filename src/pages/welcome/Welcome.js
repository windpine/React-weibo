import React,{Component} from 'react';
import WelcomeUI from "./WelcomeUI";

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
        inputValue:state.welcome.get('inputValue')
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