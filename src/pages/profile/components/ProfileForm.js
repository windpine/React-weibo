/**
 * Created by hao.cheng on 2017/4/15.
 */
import React, { Component } from 'react';
import {Modal,Card, Form, Input, Tooltip, Icon, Select, Row, Col, Button,Breadcrumb,Radio} from 'antd';
import {actionCreators} from "../store";
import {connect} from "react-redux";
import VCode from "./Vcode";
import * as axios from "axios/index";
import store from "../../../store";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const InputGroup = Input.Group;
const Option = Select.Option;



const ModalCreateForm = Form.create()
(
    (props) => {
        const { visible, onCancel, onCreate, form,checkOldPassword,checkPassword,handleConfirmBlur } = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title='请修改您的密码'
                okText='保存'
                onCancel={onCancel}
                onOk={onCreate}
            >

                <Form layout="vertical">

                    <FormItem

                        label="原密码"
                        hasFeedback
                    >
                        {getFieldDecorator('oldPassword', {
                            rules: [{
                                required: true, message: '请输入您之前的密码',
                            }, {
                                validator: checkOldPassword,
                            }],
                        })(
                            <Input type="password" onBlur={handleConfirmBlur} />
                        )}
                    </FormItem>
                    <FormItem

                        label="新密码"
                        hasFeedback
                    >

                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: '请输入您的新密码',
                            }, ],
                        })(
                            <Input type="password" onBlur={handleConfirmBlur} />
                        )}
                    </FormItem>
                    <FormItem

                        label="确认密码"
                        hasFeedback
                    >

                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: '请重新输入您修改后的密码',
                            }, {
                                validator: checkPassword,
                            }],
                        })(
                            <Input type="password" onBlur={handleConfirmBlur}/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
);

class ModalForm extends Component {

    constructor( props ) {
        super(props);
        this.state = {
            visible: false,
            nickname: this.props.data.get('nickname'),
            username:this.props.data.get('username'),
            sex: this.props.data.get('sex'),
            email: this.props.data.get('email'),
        };
    }


    handleNicknameChange=(e)=>{
        this.setState( {
            nickname: e.target.value
        } );
    }

    handleSexChange=(e)=>{
        this.setState( {
            sex: e.target.value
        } );
    }

    handleEmailChange=(e)=>{
        this.setState( {
            email: e.target.value
        } );
    }
    showModal = () => {
        this.setState({ visible: true });
    };
    saveFormRef = (form) => {
        this.form=form;
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    //针对嵌套form的提交
    handleCreate = () => {
        const form = this.form;

        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            this.setState({ visible: false });
            console.log('Received values of form: ', values['confirm']);
            this.props.handlePasswordSave(values['confirm']);
            form.resetFields();


        });
    };

//     handleVcodeCheck=(rule,value,callback)=>{
//         const form=this.props.form;
//         // console.log("oldpassword:",this.props.password);
//         console.log('输入的原密码:',value);
//         // if (value && value !== this.props.password) {
//         //     callback('密码不一致');
//         // } else {
//         //     callback();
//         // }
//         var vcode=this.state.data.map((v)=>String.fromCharCode(v > 57 && v < 84 ? v + 7 : ( v < 57 ? v : v + 13 )));
//         var vcode2=`${vcode[0]}${vcode[1]}${vcode[2]}${vcode[3]}`;//提取字符串列表中的纯字符并拼接为串
//         const newvcode=vcode2.toLowerCase();
//         console.log('vcode',vcode)
//         console.log('newvcode:',newvcode);
//         console.log("input:",value);
//         if (value && value !== newvcode) {
//             callback('验证码输入不正确');
//         }
//         else{
//             callback();
//
//         }
// }

    checkOldPassword = (rule, value, callback) => {
        const form=this.form;
        console.log("oldpassword:",this.props.password);
        console.log('输入的原密码:',value);
        if (value && value !== this.props.password) {
            callback('密码不一致');
        } else {
            callback();
        }
    };

    checkPassword = (rule, value, callback) => {
        const form = this.form;
        console.log("new",form.getFieldValue('password'));
        console.log("renew",value);

        if (value && value !== form.getFieldValue('password')) {
            callback('密码不一致！');
        } else {
            callback();
        }
    };

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        //this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    // ManageState=()=> {
    //     switch ('') {
    //         case this.state.nickname:
    //             this.setState({
    //                 nickname: this.props.data.get('nickname')
    //             });
    //             //todo:可以打印this.props.data.get('nickname')
    //             console.log('nickname:', this.state.nickname);
    //         case this.state.username:
    //             this.setState({username: this.props.data.get('username')});
    //             console.log('nickname:', this.state.username);
    //         case this.state.sex:
    //             this.setState({sex: this.props.data.get('sex')});
    //         case this.state.email:
    //             this.setState({email: this.props.data.get('email')});
    //
    //     }
    // }

    handleSubmit = (e) => {//提交外层表单时
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            let nickname='';
            let username='';
            let sex='';
            let email='';
            if (!err) {
                //console.log('Received values of form2: ', values.getFieldValue('email'));
                //this.ManageState();
                if(this.state.nickname==''){
                    nickname=this.props.data.get('nickname');
                    console.log('nickname::',nickname);
                }else{
                    nickname=this.state.nickname;
                };
                if(this.state.username==''){
                    username=this.props.data.get('username');
                    console.log('nickname::',username);
                }else{
                    username=this.state.username;
                };
                if(this.state.sex==''){
                    sex=this.props.data.get('sex');
                    console.log('nickname::',sex);
                }else{
                    sex=this.state.sex;
                };
                if(this.state.email==''){
                    email=this.props.data.get('email');
                    console.log('nickname::',email);
                }else{
                    email=this.state.email;
                }
//todo:add uid
                this.props.handleModifyClick(nickname,username,sex,email);
                alert("修改成功！");
            }
        });
    };

    // componentDidMount(){//注意：是在组件加载完毕后立即执行
    //     axios.get('api/userInfo.json').then((res)=>{
    //         // const result=JSON.parse(JSON.stringify(res.data));
    //         const result=res.data.data;
    //         const password=res.data.password;
    //         console.log("userinfoResult:",result);
    //         console.log("pwd:",password);
    //         this.props.getUserInfo(result,password);
    //     })
    // }

    render() {
        const { getFieldDecorator } = this.props.form;
        // const data=[...this.props.data];
        // let state={
        //     visible: false,
        //     nickname:[...this.props.data][0][1],
        //     username:[...this.props.data][1][1],
        //     sex:[...this.props.data][2][1],
        //     email:[...this.props.data][3][1],
        //
        // };
        // console.log('data:',data[2][1]);
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 8,
                },
            },
        };
        const {data}=this.props

        return (
            <div className="gutter-example">
                {/*<Breadcrumb first="表单" second="基础表单" />*/}
                <div className="gutter-box">

                    <Card title="" bordered={false}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem
                                {...formItemLayout}
                                label={(
                                    <span>
                                            昵称&nbsp;
                                        <Tooltip title="别人怎么称呼你?">
                                            <Icon type="question-circle-o" />
                                          </Tooltip>
                                        </span>
                                )}
                                hasFeedback
                            >
                                {getFieldDecorator('nickname', {
                                    rules: [{ required: false, message: '昵称不能为空!', whitespace: true }],
                                })(
                                    //props中的之前的对象，返回的是map类型数据，需要通过.get(key)获取数据;同时<Input>标签需要嵌套在<div>之下才能显示defaultValue属性
                                    <div style={{ marginBottom: 16 }}>
                                        <Input defaultValue={data.get('nickname')} onChange={this.handleNicknameChange}/>
                                    </div>
                                )}

                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label={(
                                    <span>
                                            用户名&nbsp;
                                        </span>
                                )}
                                hasFeedback
                            >
                                {getFieldDecorator('username', {
                                    rules: [{ required: false,}],
                                })(
                                    <div style={{ marginBottom: 16 }}>
                                        <Input defaultValue={data.get('username')} disabled={"true"}></Input>
                                    </div>
                                )}

                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="邮箱"
                                hasFeedback
                            >
                                {getFieldDecorator('email', {
                                    rules: [{
                                        type: 'email', message: '请输入合理的邮箱地址!',
                                    }, {
                                        required: false, message: '请输入邮箱地址!',
                                    }],
                                })(
                                    <div style={{ marginBottom: 16 }}>
                                        <Input defaultValue={data.get('email')} onChange={this.handleEmailChange}/>
                                    </div>
                                )}

                            </FormItem>
                            <FormItem
                                label={"性别"}
                                hasfeedback
                            >
                                {getFieldDecorator('sex', {
                                    rules: [ {
                                        required: false,
                                    }],
                                })(
                                    //todo:当使用radioGroup时，性别无法显示默认值，（可以取常量字符串""，但不能取data.get('sex')，估计是因为object和String的关系？？）
                                    <div style={{ marginBottom: 16 }}>
                                        <Input defaultValue={data.get('sex')} onChange={this.handleSexChange}/>
                                    </div>
                                                                   )
                                   }


                            </FormItem>


                            <FormItem
                                {...formItemLayout}
                                label="密码"
                                hasFeedback
                            >

                                <Input type="password" defaultValue={this.props.password} disabled={"true"}/>

                                <Button type="primary" onClick={this.showModal}>修改密码</Button>
                                <ModalCreateForm
                                    ref={this.saveFormRef}
                                    visible={this.state.visible}
                                    onCancel={this.handleCancel}
                                    onCreate={this.handleCreate}
                                    checkOldPassword={this.checkOldPassword}
                                    checkPassword={this.checkPassword}
                                    handleConfirmBlur={this.handleConfirmBlur}
                                />
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="验证码"
                                extra="请不是机器人的你以小写格式输入验证"
                            >
                                <VCode/>

                            </FormItem>

                            <FormItem {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit" onClick={this.handleSubmit} size="large">确认修改</Button>
                            </FormItem>
                        </Form>
                    </Card>
                </div>


            </div>
        );
    }
}


const mapStateToProps=(state)=>{
    return{
        data:state.getIn(['profile','data']),
        // username:state.getIn(['data','nickname']),
        // sex:state.getIn(['data','nickname']),
        // email:state.getIn(['data','email']),
        password:state.getIn(['profile','password']),
       // isModalVisible:state.getIn(['data','isModalVisible']),


    }

}

const mapDispatchToProps=(dispatch)=>{
    return{
        handleModifyClick(uid,nickname,username,sex,email){
            console.log("form_data:",nickname,username,sex,email);
            console.log('sex2:',sex.toLocaleString());
            //todo:add uid
            dispatch(actionCreators.saveProfileDataAction(uid,nickname,username,sex,email))

        },
        handlePasswordSave(password){
            dispatch(actionCreators.savePasswordAction(password));
        },
        handleStoreChange(){
            this.setState(store.getState());

        }
        // getUserInfo(result,password){
        //     dispatch(actionCreators.changeUserInfoActoin(result,password));
        // },

    }
}

ModalForm=Form.create()(ModalForm);//针对每一个单独的Form，无论嵌不嵌套，都需要通过Form.create创建一个新的props
export default connect(mapStateToProps,mapDispatchToProps)(ModalForm);