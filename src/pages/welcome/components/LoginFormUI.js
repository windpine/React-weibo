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
                    rules: [{ required: true, message: '请输入用户名!' }],
                })(
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="用户名"
                        ref={(input)=>{this.username=input}}/>
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码!' }],
                })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                           type="password"
                           placeholder="密码"
                           ref={(input)=>{this.password=input}}/>
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                })(
                    <Checkbox>记住我</Checkbox>
                )}
                <Link className="login-form-forgot" to="/forgot">忘记密码</Link>
                <Button type="primary"
                        htmlType="submit"
                        className="login-form-button">
                    登陆
                </Button>
                Or <Link to="/register">还没注册？点这里!</Link>
            </FormItem>
        </Form>
    );
}