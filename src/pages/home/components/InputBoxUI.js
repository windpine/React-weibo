import React,{Component} from 'react';
import {Mention,Icon} from 'antd';
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
                value={props.value}

            />

        );
}


export default InputBoxUI;
