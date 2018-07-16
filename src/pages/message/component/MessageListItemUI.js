import React from 'react'
import {Menu,Dropdown,Icon,List} from 'antd'
import {RightButton,MySpan,MyIcon} from './styled'
import * as words from "../wordInternationalization";
import * as messageType from './messageType'

const MessageListItemUI = (props)=>{
    function MyMenu(props){
        return(<Menu selectable={false} onClick={()=>{props.deleteAction(props.messageID)}} >
                    <Menu.Item >
                        <a>{words.MESSAGE_RIGHT_MENU[0]}</a>
                    </Menu.Item>
                </Menu>
        )
    };
    const RightDropdown =(
        <Dropdown overlay={<MyMenu messageID={props.item.messageId} deleteAction={props.deleteAction}/>}>
            <RightButton size="small" >
                <Icon type="down"/>
            </RightButton>
        </Dropdown>
    )
    function chooseMeta(){
        switch(props.messageType){
            case messageType.MENTION:
                return (
                    <List.Item
                        key={props.item.messageId}
                        actions={[RightDropdown]}
                    >
                        <List.Item.Meta
                            title={
                                <MySpan fontSize="15px" marginLeft="50px" fontWeight="bold" marginTop="10px">
                                    <MyIcon type="exclamation-circle-o" />
                                    <a>{props.item.nickName}</a>
                                </MySpan>
                            }
                            description={<MySpan fontSize="10px" marginLeft="60px" fontWeight="normal">在"{props.item.content}"提到你</MySpan>}
                        />
                        <div style={{"margin-right":"20px"}}>{props.item.createTime.substring(0,10)}</div>
                    </List.Item>
                )
            case messageType.COMMENT:
                return (
                    <List.Item
                        key={props.item.messageId}
                        actions={[RightDropdown]}
                    >
                        <List.Item.Meta
                            title={
                                <MySpan fontSize="15px" marginLeft="50px" fontWeight="bold" marginTop="10px">
                                    <MyIcon type="exclamation-circle-o" />
                                    <a>{props.item.nickName}</a>
                                </MySpan>
                            }
                            description={<MySpan fontSize="10px" marginLeft="60px" fontWeight="normal">在"{props.item.content}"评论你</MySpan>}
                        />
                        <div style={{"margin-right":"20px"}}>{props.item.createTime.substring(0,10)}</div>
                    </List.Item>
                );
            case messageType.LIKES:
                return(
                    <List.Item
                        key={props.item.messageId}
                        actions={[RightDropdown]}
                    >
                        <List.Item.Meta
                            title={
                                <MySpan fontSize="15px" marginLeft="50px" fontWeight="bold" marginTop="10px">
                                    <MyIcon type="like-o" />
                                    <a>{props.item.nickName}</a>
                                </MySpan>
                            }
                            description={<MySpan fontSize="10px" marginLeft="60px" fontWeight="normal">在"{props.item.content}"点赞</MySpan>}
                        />
                    </List.Item>
                );
            default:
                return(
                    <List.Item/>
                )
        }
    }
    return(
        chooseMeta()
    )
}
export default MessageListItemUI;