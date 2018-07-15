import React from 'react';
import 'antd/dist/antd.css';
import './upload.css';
import axios from 'axios'
import { Upload, Icon, message ,Modal} from 'antd';
import {connect} from 'react-redux';
import * as actionCreators from '../store/actionCreators'
import store from '../../../store';

const baseURL='https://weibo-1252079771.cos.ap-beijing.myqcloud.com/';

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024/1024  < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}


const uploadProps = {
    action: baseURL,
    multiple: false,
    onStart(file) {
        console.log('onStart', file, file.name);
    },
    onSuccess(ret, file) {
        console.log('onSuccess', ret, file.name);
    },
    onError(err) {
        console.log('onError', err);
    },
    onProgress({ percent }, file) {
        console.log('onProgress', `${percent}%`, file.name);
    },
    customRequest({
                      action,
                      data,
                      file,
                      filename,
                      headers,
                      onError,
                      onProgress,
                      onSuccess,
                  }) {
        axios
            .put(action+file.name, file, {
                headers,
                onUploadProgress: ({ total, loaded }) => {
                    onProgress({ percent: Math.round(loaded / total * 100).toFixed(2) }, file);
                },
            })
            .then(({ data: response }) => {
                onSuccess(response, file);
            })
            .catch(onError);

        return {
            abort() {
                console.log('upload progress is aborted.');
            },
        };
    },
};

class Avatar extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }],
    };


    uploadProps = (props)=>({
        action: baseURL,
        multiple: false,
        onStart(file) {
            console.log('onStart', file, file.name);
        },
        onSuccess(ret, file) {
            props.handleChange(file)
            console.log('onSuccess', ret, file.name);
        },
        onError(err) {
            console.log('onError', err);
        },
        onProgress({ percent }, file) {
            console.log('onProgress', `${percent}%`, file.name);
        },
        customRequest({
                          action,
                          data,
                          file,
                          filename,
                          headers,
                          onError,
                          onProgress,
                          onSuccess,
                      }) {
            axios
                .put(action+file.name, file, {
                    headers,
                    onUploadProgress: ({ total, loaded }) => {
                        onProgress({ percent: Math.round(loaded / total * 100).toFixed(2) }, file);
                    },
                })
                .then(({ data: response }) => {
                    onSuccess(response, file);
                })
                .catch(onError);

            return {
                abort() {
                    console.log('upload progress is aborted.');
                },
            };
        },
    });
    render() {
        const {fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    {...this.uploadProps}
                    listType="picture-card"
                    onPreview={this.props.handlePreview}
                    beforeUpload={beforeUpload}
                    onChange={this.props.handleChange}
                >
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal visible={this.props.previewVisible} footer={null} onCancel={this.props.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={this.props.handlePreview} />
                </Modal>
            </div>
        );
    }
}

const mapStateToProps=(state)=>{
    return {
        previewVisible:state.getIn(['register','previewVisible']),
        previewImage:state.getIn(['register','previewImage']),
        fileList:state.getIn(['register','fileList'])
    }
}


const mapDispatchToProps = (dispatch)=>{
    return {
        handleCancel() {
            console.log('删除预览')
            dispatch(actionCreators.handlePreviewCancle())
        },
        handlePreview(file){
            console.log('处理预览');
            console.log(file);
            dispatch(actionCreators.handlePreview(file))
        },
        handleChange(fileList){
            console.log(fileList)
            console.log("列表变化了")
            dispatch(actionCreators.handleFileChange(fileList))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Avatar);