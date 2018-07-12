import React,{Component} from 'react';
import {Mention} from 'antd';
import 'antd/dist/antd.css'


const InputBoxUI=(props) =>{
        return (
            <Mention
                onSearchChange={props.onSearchChange}
                suggestions={props.suggestions}
                onSelect={props.onSelect}
                onChange={props.onChange}
                style={props.style}
                placeholder={props.placeholder}
                prefix={props.prefix}
            />
        );
}


export default InputBoxUI;
