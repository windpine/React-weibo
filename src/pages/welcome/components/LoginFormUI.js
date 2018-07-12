import React,{Component} from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {Link} from 'react-router-dom';
import 'antd/dist/antd.css';
import './LoginForm.css'

const FormItem = Form.Item;

export const LoginFormUI = (props)=>{

    const { getFieldDecorator } = props.form;
    return (
        <Form onSubmit={props.handleSubmit} className="login-form">
            <FormItem>
                {getFieldDecorator('username', {
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
                        className="login-form-button">
                    Log in
                </Button>
                Or <Link to="/register">register now!</Link>
            </FormItem>
        </Form>
    );
}