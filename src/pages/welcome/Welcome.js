import React,{Component} from 'react';
import WelcomeUI from "./WelcomeUI";
import {withRouter,Redirect} from 'react-router-dom';
import store from '../../store';
import {connect} from 'react-redux';


class Welcome extends Component{

    constructor(props){
        super(props);
        store.subscribe(this.props.handleStoreChange.bind(this))
    }
    render(){
        const {loginState} =this.props;
        return (
            loginState?<Redirect to="/home"/>:<WelcomeUI/>
        )
    }
}

const mapStatesToProps = (state)=>{
    return {
        loginState:state.getIn(['welcome','loginState'])
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        handleStoreChange(){
            this.setState(store.getState());
        }
    }
}

export default connect(mapStatesToProps,mapDispatchToProps)(withRouter(Welcome));