import React,{Component} from 'react';
import WelcomeUI from "./WelcomeUI";
import {withRouter,Redirect} from 'react-router-dom';
import store from '../../store';
import {connect} from 'react-redux';


class Welcome extends Component{

    constructor(props){
        super(props);
    }
    render(){
        const {loginState} =this.props;
        return (
            sessionStorage.getItem('uid')?<Redirect to="/home"/>:<WelcomeUI/>
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

    }
}

export default connect(mapStatesToProps,mapDispatchToProps)(withRouter(Welcome));