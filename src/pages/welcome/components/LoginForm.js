import React,{Component} from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {connect} from 'react-redux';
import 'antd/dist/antd.css';
import './LoginForm.css'
import {actionCreators} from "../store";

const FormItem = Form.Item;

class NormalLoginForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                            ref={(input)=>{this.username=input}}/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                               type="password"
                               placeholder="Password"
                               ref={(input)=>{this.password=input}}/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">Forgot password</a>
                    <Button type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            onClick={()=>{this.props.handleLoginClick(this.username,this.password)}}>
                        Log in
                    </Button>
                    Or <a href="">register now!</a>
                </FormItem>
            </Form>
        );
    }
}
const mapStatesToProps = (state)=>{
    return {

    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        handleUsernameValue(e){
            dispatch(actionCreators.getInputUsernameAction(e.target.value))
        },
        handlePasswordValue(e){
            dispatch(actionCreators.getInputPasswordAction(e.target.value))
        },
        handleLoginClick(username,password){
            dispatch(actionCreators.saveLoginInfo(username.input.value,password.input.value))
        }
    }
}

const LoginForm = Form.create()(NormalLoginForm);

export default connect(mapStatesToProps,mapDispatchToProps)(LoginForm);