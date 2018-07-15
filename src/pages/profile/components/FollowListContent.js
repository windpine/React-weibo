
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

import { Table, Input, Button, Popconfirm, Form } from 'antd';
import {connect} from "react-redux";
import * as axios from "axios";
import {actionCreators} from "../store";

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
            title: '用户名',
            dataIndex: 'name',
            width: '30%',
            editable: true,
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
                    //todo:处理button显示bug
                    this.props.dataSource.toJS().length >= 1
                        ? (
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                                <a href="javascript:;">取消关注</a>
                            </Popconfirm>
                        ) : null
                );
            },
        }];

        this.state = {
            dataSource:this.props.dataSource.toJS,

            // count: 2,
        };
    }
    componentDidMount(){
        axios.get('api/followList.json').then((res)=>{
            const result=res.data.data;
            console.log("result",result);
            this.props.getFollowList(result);
        })
    }

    //todo:添加结束组件时重新回存

    handleDelete = (key) => {
        const dataSource = [...this.props.dataSource.toJS()];
        //todo:删除时更新列表
        this.props.getFollowList(dataSource.filter(item => item.key !== key));
    }


    //todo：确认
    handleSave = (row) => {
        const newData = [...this.props.dataSource.toJS()];
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
        const dataSource=[...this.props.dataSource.toJS()];
        //console.log('datasource:',dataSource);
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
                />
            </div>
        );
    }
}



const mapStateToProps=(state)=>{
    return{
        dataSource:state.getIn(['profile','follows']),

    }

}

const mapDispatchToProps=(dispatch)=>{
    return{
        getFollowList(result){
            dispatch(actionCreators.changeFollowListAction(result));
            console.log('dispatch_result:',result);

        },
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(FollowListContent);
