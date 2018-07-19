import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

import { Table, Input, Button, Popconfirm, Form } from 'antd';
import {connect} from "react-redux";
import * as axios from "axios";
import {actionCreators} from "../store";
import NavLink from "react-router-dom/es/NavLink";
import {Link} from "react-router-dom";
import Avatar from "antd/es/avatar/index";

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    }

    save = () => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error) {
                return;
            }
            //this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    }

    render() {
        const {
            ...restProps
        } = this.props;
        return (
            <td ref={node => (this.cell = node)} {...restProps}>
                <div
                    className="editable-cell-value-wrap"
                    style={{ paddingRight: 24 }}
                    //onClick={this.toggleEdit}
                >
                    {restProps.children}
                </div>

            </td>
        );
    }
}



class FollowListContent extends React.Component {

    constructor(props) {
        super(props);
        this.columns = [{
            title: '用户头像',
            dataIndex: 'avatarUrl',
            width: '30%',
            render: (text, record) => {
                return (
                    this.props.dataSource.length >= 1
                        ? (

                            <a href={`/profile/${record.uid}/1`}><Avatar src={record.avatarUrl}></Avatar></a>
                        ) : null
                );
            },
        },{
            title: '用户名',
            dataIndex: 'username',
            width: '30%',

        }, {
            title: '性别',
            dataIndex: 'sex',
        }, {
            title: '邮箱',
            dataIndex: 'email',
        }, {
            title: 'operation',
            dataIndex: 'operation',
            render: (text, record) => {
                return (
                    this.props.dataSource.length >= 1
                        ? (
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.username,record.uid)}>
                                <a href="javascript:;">取消关注</a>
                            </Popconfirm>
                        ) : null
                );
            },
        }];

        this.state = {
            dataSource:this.props.dataSource,

        };
    }
    handleDelete = (username,deleteId) => {
        const dataSource = [...this.props.dataSource];
        this.props.getFollowList(dataSource.filter(item => item.username !== username),deleteId);
    }


    handleSave = (row) => {
        const newData = [...this.props.dataSource];
        console.log("newData:",newData);
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ dataSource: newData });
    }

    render() {
        const dataSource=[...this.props.dataSource];
        console.log('datasource:',dataSource);
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    loading={this.props.loading}
                />
            </div>
        );
    }
}



const mapStateToProps=(state)=>{
    return{
        dataSource:state.getIn(['profile','followsList']),

    }

}

const mapDispatchToProps=(dispatch)=>{
    return{
        getFollowList(result,deleteId){
            dispatch(actionCreators.saveFollowListRequest(result,deleteId));
            console.log("result:",result);
            console.log('deleteId:',deleteId);

        },


    }
}

export default connect(mapStateToProps,mapDispatchToProps)(FollowListContent);