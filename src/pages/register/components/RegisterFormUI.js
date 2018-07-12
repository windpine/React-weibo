import React from 'react';
import { Form, Tooltip, Icon,Row, Col, Button} from 'antd';
import 'antd/dist/antd.css';
import {RegisterInput} from "./styled";

const FormItem = Form.Item;

export const RegisterFormUI =(props)=>{
    const { getFieldDecorator } = props.form;
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };
    return (
        <Form onSubmit={props.handleSubmit} style={{marginTop:"20px"}}>
            <FormItem
                {...formItemLayout}
                label="Username"
            >
                {getFieldDecorator('username', {
                    rules: [{
                        required: true, message: 'Please input your Username!',
                    }],
                })(
                    <RegisterInput />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Password"
            >
                {getFieldDecorator('password', {
                    rules: [{
                        required: true, message: 'Please input your password!',
                    }, {
                        validator: props.validateToNextPassword,
                    }],
                })(
                    <RegisterInput type="password" />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Confirm Password"
            >
                {getFieldDecorator('confirm', {
                    rules: [{
                        required: true, message: 'Please confirm your password!',
                    }, {
                        validator: props.compareToFirstPassword,
                    }],
                })(
                    <RegisterInput type="password" onBlur={props.handleConfirmBlur} />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="E-mail"
            >
                {getFieldDecorator('email', {
                    rules: [{
                        type: 'email', message: 'The input is not valid E-mail!',
                    }, {
                        required: true, message: 'Please input your E-mail!',
                    }],
                })(
                    <RegisterInput />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label={(
                    <span>
              Nickname&nbsp;
                        <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
                )}
            >
                {getFieldDecorator('nickname', {
                    rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                })(
                    <RegisterInput />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Captcha"
                extra="We must make sure that your are a human."
            >
                {getFieldDecorator('captcha', {
                    rules: [{ required: true, message: 'Please input the captcha you got!' }],
                })(
                    <RegisterInput />
                )}
                <Button style={{marginLeft:"10px"}}>Get captcha</Button>
            </FormItem>
            <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">Register</Button>
            </FormItem>
        </Form>
    )
}