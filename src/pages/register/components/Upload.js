import React from 'react';
import 'antd/dist/antd.css';
import './upload.css';
import axios from 'axios'
import { Upload, Icon, message } from 'antd';

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


const uploadProps = {
    action: baseURL,
    multiple: false,
    onStart(file) {
        console.log('onStart', file, file.name);
    },
    onSuccess(ret, file) {
        console.log('onSuccess', ret, file.name);
        this.setState('imageUrl',baseURL+file.name)
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
        loading: false,
        imageUrl: ''
    };

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        return (
            <Upload
                {...uploadProps}
                accept="image/*"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
            </Upload>
        );
    }
}
export default Avatar;