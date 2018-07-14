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
                label="用户名"
            >
                {getFieldDecorator('username', {
                    rules: [{
                        required: true, message: '请输入用户名!',
                    }],
                })(
                    <RegisterInput />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="密码"
            >
                {getFieldDecorator('password', {
                    rules: [{
                        required: true, message: '请输入密码!',
                    }, {
                        validator: props.validateToNextPassword,
                    }],
                })(
                    <RegisterInput type="password" />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="再次输入密码"
            >
                {getFieldDecorator('confirm', {
                    rules: [{
                        required: true, message: '请再次确认你的密码!',
                    }, {
                        validator: props.compareToFirstPassword,
                    }],
                })(
                    <RegisterInput type="password" onBlur={props.handleConfirmBlur} />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="邮箱"
            >
                {getFieldDecorator('email', {
                    rules: [{
                        type: 'email', message: '这不是合法的邮箱地址!',
                    }, {
                        required: true, message: '请输入你的邮箱!',
                    }],
                })(
                    <RegisterInput />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label={(
                    <span>
              昵称&nbsp;
                        <Tooltip title="别人对你的称呼?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
                )}
            >
                {getFieldDecorator('nickname', {
                    rules: [{ required: true, message: '请输入你的昵称!', whitespace: true }],
                })(
                    <RegisterInput />
                )}
            </FormItem>
            {/*<FormItem*/}
                {/*{...formItemLayout}*/}
                {/*label="验证码"*/}
                {/*extra="你不是一个机器人."*/}
                {/*style={{visibility:'hidden'}}*/}
            {/*>*/}
                {/*{getFieldDecorator('captcha', {*/}
                    {/*rules: [{ required: false, message: '请输入你获得的验证码!' }],*/}
                {/*})(*/}
                    {/*<RegisterInput />*/}
                {/*)}*/}
                {/*<Button style={{marginLeft:"10px"}}>获取验证码</Button>*/}
            {/*</FormItem>*/}
            <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">立刻注册</Button>
            </FormItem>
        </Form>
    )
}