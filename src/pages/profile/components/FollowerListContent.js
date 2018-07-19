
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

import { Table, Input, Button, Popconfirm, Form } from 'antd';
import {connect} from "react-redux";
import * as axios from "axios";
import {actionCreators} from "../store";
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

    render() {
        const {
            ...restProps
        } = this.props;
        return (
            <td ref={node => (this.cell = node)} {...restProps}>
                <div
                    className="editable-cell-value-wrap"
                    style={{ paddingRight: 24 }}
                >
                    {restProps.children}
                </div>

            </td>
        );
    }
}



class FollowerListContent extends React.Component {

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
        },  ];

        this.state = {
            dataSource:this.props.dataSource,
            loading:false,

        };
    }
    render() {
        const dataSource=[...this.props.dataSource];
        console.log('followerList:',dataSource);
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
        dataSource:state.getIn(['profile','followersList']),

    }

}

const mapDispatchToProps=(dispatch)=>{
    return{
        getFollowerList(result){
            dispatch(actionCreators.changeFollowerListAction(result));

        },
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(FollowerListContent);
