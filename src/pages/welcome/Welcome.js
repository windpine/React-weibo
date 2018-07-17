import React,{Component} from 'react';
import WelcomeUI from "./WelcomeUI";
import {withRouter,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';


class Welcome extends Component{

    constructor(props){
        super(props);
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


export default connect(mapStatesToProps,null)(withRouter(Welcome));