import React,{Component} from 'react'
import { Form} from 'antd';
import {connect} from 'react-redux';
import 'antd/dist/antd.css';
import './LoginForm.css'
import {actionCreators} from "../store";
import {LoginFormUI} from "./LoginFormUI";
import {fromJS} from 'immutable';


class NormalLoginForm extends Component {

    constructor(props){
        super(props)
    }
    render() {
       return(
           <LoginFormUI
            form={this.props.form}
            handleSubmit={this.props.handleSubmit.bind(this)}
            />
       )
    }
}


const mapDispatchToProps = (dispatch)=>{

    return {
        handleSubmit(e){
            console.log(e);
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                    dispatch(actionCreators.saveLoginInfo(fromJS(values)));
                    dispatch(actionCreators.loginRequest(values));
                }
            });
        }
    }
}

const LoginForm = Form.create()(NormalLoginForm);

export default connect(null,mapDispatchToProps)(LoginForm);