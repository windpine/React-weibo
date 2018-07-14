import React,{Component} from 'react'
import {connect} from 'react-redux';
import 'antd/dist/antd.css';
import {withRouter} from 'react-router-dom';
import {RegisterUI} from "./RegisterUI";



class Register extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <RegisterUI/>
        )
    }

}

export default connect(null,null)(withRouter(Register))