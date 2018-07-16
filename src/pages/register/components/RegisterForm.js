import React,{Component} from 'react'
import {Form} from 'antd';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {actionCreators} from "../store";
import {RegisterFormUI} from "./RegisterFormUI";
import store from '../../../store';
import {fromJS} from 'immutable';



class NormalRegisterForm extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <RegisterFormUI
                form = {this.props.form}
                handleSubmit={this.props.handleSubmit.bind(this)}
                autoCompleteResult={this.props.autoCompleteResult}
                validateToNextPassword={this.props.validateToNextPassword.bind(this)}
                compareToFirstPassword={this.props.compareToFirstPassword.bind(this)}
                handleConfirmBlur={this.props.handleConfirmBlur}/>
        )
    }

}

const mapStatesToProps = (state)=>{
    return {
        autoCompleteResult:state.getIn(['register','autoCompleteResult']),
        avatarUrl:state.getIn(['register','register','avatarUrl'])
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        handleSubmit(e){
            e.preventDefault();
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    values.avatarUrl=this.props.avatarUrl;
                    console.log('Received values of form: ', values);
                    dispatch(actionCreators.registerRequest(values))
                    this.props.history.push('/welcome');
                }
            });;
        },
        handleConfirmBlur(e){
            dispatch(actionCreators.confirmBlur(e.target.value))
        },
        compareToFirstPassword(rule, value, callback){
            const form = this.props.form;
            if (value && value !== form.getFieldValue('password')) {
                callback('两次输入的密码不一致!');
            } else {
                callback();
            }
        },
        validateToNextPassword(rule, value, callback){
            const form = this.props.form;
            if (value && store.getState().getIn(['register','confirmDirty'])) {
                form.validateFields(['confirm'], { force: true });
            }
            callback();
        }
    }
}
const RegisterForm = Form.create()(NormalRegisterForm);

export default connect(mapStatesToProps,mapDispatchToProps)(withRouter(RegisterForm))