import React from 'react'
import styled from 'styled-components';
import {List,Button,Icon} from 'antd'
import 'antd/dist/antd.css'

export const MyMessageList = styled(List)`
     min-height: 350px;
`
export const MySpan = styled('span')`
    font-size:${
        props => props.fontSize
    };
    font-weight:${
        props => props.fontWeight
    };
    margin-left: ${
        props => props.marginLeft
    };
    margin-top:${
        props => props.marginTop
    }
`
export const RightButton = styled(Button)`
    border:none;
    margin-right:50px;
`
export const MyIcon = styled(Icon)`
     fontSize:20;
     margin-right:10px;
`