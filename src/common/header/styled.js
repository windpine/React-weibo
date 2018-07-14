import styled from 'styled-components';
import {Menu,Button,Divider} from 'antd';
import 'antd/dist/antd.css'

export const LoginButton = styled(Button)`
    float:right;
    position:absolute;
    top: 0;
    right: 160px;
    margin: 15px 24px 12px 0;
    border-radius: 8px;
    border: transparent;
   
`;

export const RegisterButton = styled(Button)`
  position:absolute;
  top: 0;
  right:256px;
  float: right;
  margin: 15px 24px 12px 0;
  border-radius: 8px;
  border: transparent;
`

export const Greeting = styled.div`
  position:absolute;
  top: 0;
  right:96px;
  float: right;
  font-size: 15px;
  color: darkgrey;
  padding:10px;
`