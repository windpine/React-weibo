import React,{Component} from 'react';
import WelcomeUI from "./WelcomeUI";

import store from '../../store';
import {connect} from 'react-redux';
import {getInputValueAction} from "../../store/actionCreators";

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
        inputValue:state.welcome.inputValue
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        handleInputChange(e){
            const action=getInputValueAction(e.target.value);
            dispatch(action);
        },
        handleStoreChange(){
            this.setState(store.getState());
        }
    }
}


export default connect(mapStatesToProps,mapDispatchToProps)(Welcome);