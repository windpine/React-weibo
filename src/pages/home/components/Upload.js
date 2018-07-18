import React from 'react';
import 'antd/dist/antd.css';
import './upload.css';
import axios from 'axios'
import { Upload, Icon, message ,Modal} from 'antd';
import {connect} from 'react-redux';
import * as actionCreators from '../store/actionCreators'

const baseURL='https://weibo-1252079771.cos.ap-beijing.myqcloud.com/';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

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



class Avatar extends React.Component {

    constructor(props){
        super(props)
    }


    uploadProps = {
        action: baseURL,
        multiple: false,
        onStart(file) {
            console.log('onStart', file, file.name);
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
    render() {
        const uploadProps = this.uploadProps;
        const {handleChange,handlePreview,handleCancel,previewVisible,file}= this.props;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    {...uploadProps}
                    onSuccess={(ret,file)=>{
                        handleChange(file);
                        console.log('onSuccess', ret, file.name);
                    }}
                    onPreview={handlePreview}
                    listType="picture-card"
                    beforeUpload={beforeUpload}
                >

                    {file.get('url') ? <img src={file.get('url')} alt="avatar" style={{ height:"10%" }} /> : uploadButton}
                </Upload>
            </div>
        );
    }
}

const mapStateToProps=(state)=>{
    return {
        previewVisible:state.getIn(['home','previewVisible']),
        previewImage:state.getIn(['home','previewImage']),
        file:state.getIn(['home','file'])
    }
}


const mapDispatchToProps = (dispatch)=>{
    return {
        handleCancel() {
            console.log('删除预览')
            dispatch(actionCreators.handlePreviewCancle())
        },
        handlePreview(){
            console.log('处理预览');
            dispatch(actionCreators.handlePreview())
        },
        handleChange(file){
            console.log(file)
            console.log("文件有变化了")
            dispatch(actionCreators.handleFileChange(file))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Avatar);