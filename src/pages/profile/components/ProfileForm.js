/**
 * Created by hao.cheng on 2017/4/15.
 */
import React, { Component } from 'react';
import {Modal,Card, Form, Input, Tooltip, Icon, Select, Row, Col, Button,Breadcrumb,Radio} from 'antd';
import {actionCreators} from "../store";
import {connect} from "react-redux";
import VCode from "./Vcode";
import Avatar from "./Upload";
import store from "../../../store";
import axios from 'axios';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const InputGroup = Input.Group;
const Option = Select.Option;

var config = {
    baseURL: 'http://localhost:8080'
};


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
                                validator:checkOldPassword,
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
            nickname: this.props.nickname,
            username:this.props.username,
            sex: this.props.sex,
            email: this.props.email,
            avatarUrl:this.props.avatarUrl,
            vcode:'',
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


    checkOldPassword = (rule, value, callback) => {
        const form=this.form;
        const myuid=sessionStorage.getItem('uid');
        let result;
        console.log("oldpassword:",this.props.password);
        console.log('输入的原密码:',value);
        axios.get("/users"+"/"+myuid+"/"+value,config)
            .then(res=>{
                this.setState({
                    loading: false,
                });
                result=res.data.data;
                console.log("axiosPwdInfo:",result);
                if (result!= this.props.password ) {
                    callback('密码不一致');
                } else {
                    callback();

                }
            })

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

    handleSubmit = (e) => {//提交外层表单时
        e.preventDefault();//最好重新提交一下，因为不然密码
        this.props.form.validateFieldsAndScroll((err, values) => {
            let nickname='';
            let username='';
            let sex='';
            let email='';
            let avatarUrl='';

            if (!err) {
                //console.log('Received values of form2: ', values.getFieldValue('email'));
                //this.ManageState();
                if(this.state.nickname==''){
                    nickname=this.props.nickname;
                    console.log('nickname::',nickname);
                }else{
                    nickname=this.state.nickname;
                };
                if(this.state.username==''){
                    username=this.props.username;
                    console.log('nickname::',username);
                }else{
                    username=this.state.username;
                };
                if(this.state.sex==''){
                    if(this.props.sex==''){
                        sex='无';
                    }else{
                        sex=this.props.sex;
                    }
                    console.log('性别::',sex);
                }else{
                    sex=this.state.sex;
                };
                if(this.state.email==''){
                    email=this.props.email;
                    console.log('nickname::',email);
                }else{
                    email=this.state.email;
                };
                if(this.state.avatarUrl==''){
                    avatarUrl=this.props.avatarUrl;
                    console.log('avartarUrl:',avatarUrl);
                }else{
                    avatarUrl=this.props.avatarUrl;
                    console.log('NotnullavartarUrl:',avatarUrl);
                }

                this.props.handleModifyClick(this.props.uid,nickname,this.props.username,this.props.tweets,this.props.follows
                    ,this.props.followers,avatarUrl,sex,this.props.password,email);

                alert("修改成功！");
            }
        });
    };

    onRef = (ref) => {
        this.child = ref
    }

    // handleVcodeChange=(e)=>{
    //     this.setState( {
    //         vcode: e.target.value
    //     } );
    //     console.log(e.target.value);
    //     console.log("传送的vcode:",this.state.vcode);
    // }

    handleVcodeChange=(rule, value, callback)=>{
        console.log("传送的vcode:",value);
        switch (this.child.handleVcodeBlur(value)){
            case "yes":
                callback();
            case "no":
                callback("验证码不正确");
            case "empty":
                callback();
        } ;

    }



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
                        <Form onSubmit={this.handleSubmit} >
                            <FormItem
                                {...formItemLayout}
                                label="修改头像"
                                extra="头像大小不能超过200kb"
                            >
                                {getFieldDecorator('avatarUrl',
                                    {rule:[{required:false}]})(<Avatar/>)}
                            </FormItem>

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
                                        <Input defaultValue={this.props.nickname} onChange={this.handleNicknameChange}/>
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
                                        <Input defaultValue={this.props.username} disabled={true}></Input>
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
                                        <Input defaultValue={this.props.email} onChange={this.handleEmailChange}/>
                                    </div>
                                )}

                            </FormItem>
                            <FormItem
                                hasfeedback
                            >
                                {getFieldDecorator('sex', {
                                    rules: [ {
                                        required: false,
                                    }],
                                })(
                                    <div style={{marginLeft:'29%'}}>
                                        性别：
                                        <RadioGroup onChange={this.handleSexChange} defaultValue={this.props.sex}>
                                            <Radio value="男">男</Radio>
                                            <Radio value="女">女</Radio>
                                        </RadioGroup>
                                    </div>
                                )
                                }


                            </FormItem>


                            <FormItem
                                {...formItemLayout}
                                label="密码"
                                hasFeedback
                            >

                                <Input type="password" defaultValue={this.props.password} disabled={true}/>

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
                                {getFieldDecorator('vcode', {
                                    rules: [ {
                                        required: true,message:"请输入验证码！"
                                    },{
                                        validator:this.handleVcodeChange

                                }],
                                })(
                                    <Row gutter={20}>
                                        <Col span={12}>
                                            <Input/>
                                        </Col>
                                        <Col span={12}>
                                            <VCode onRef={this.onRef} />
                                        </Col>
                                    </Row>
                                )
                                }



                            </FormItem>
                            <br/><br/><br/><br/>


                            <FormItem {...tailFormItemLayout}>
                                <div style={{marginRight:-1000}}>
                                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit} size="large">确认修改</Button>
                                    <div>(友情提示：空值输入将默认存储为最新修改记录)</div>
                                </div>

                            </FormItem>
                        </Form>
                        {/*<iframe id="id_iframe" name="nm_iframe" style="display:none;"></iframe>*/}
                    </Card>
                </div>


            </div>
        );
    }
}


const mapStateToProps=(state)=>{
    return{
        uid:state.getIn(['profile','uid']),
        nickname:state.getIn(['profile','nickname']),
        username:state.getIn(['profile','username']),
        sex:state.getIn(['profile','sex']),
        email:state.getIn(['profile','email']),
        password:state.getIn(['profile','password']),
        avatarUrl:state.getIn(['profile','avatarUrl']),
        tweets:state.getIn(['profile','tweets']),
        follows:state.getIn(['profile','follows']),
        followers:state.getIn(['profile','follows']),
    }

}

const mapDispatchToProps=(dispatch)=>{
    return{
        handleModifyClick(uid,nickname,username,tweets,follows,followers,avatarUrl,sex,password,email){
            console.log("form_data:",nickname,username,sex,email);
            dispatch(actionCreators.saveProfileRequest(uid,nickname,username,tweets,follows,followers,avatarUrl,sex,password,email))

        },
        handlePasswordSave(password){
            let result;
            const myuid=sessionStorage.getItem('uid');
            axios.get("/users"+"/"+myuid+"/"+password,config)
                .then(res=>{
                    result=res.data.data;
                    //console.log("axiosPwdInfo:",result);
                    dispatch(actionCreators.savePasswordAction(result));
                })
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