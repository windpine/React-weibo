import React from 'react'
import {MyMessageList,MySpan,RightButton,MyIcon} from './styled'
import {Dropdown,Icon,Menu} from 'antd';
import MessageListItem from './MessageListItem'
import * as messageType from './messageType';
import * as words from "../wordInternationalization";
import {Modal} from "antd/lib/index";


const MessageListUI = function(props){

    return(
        <MyMessageList
            className="Message"
            loading={props.loading}
            header={<MySpan fontSize="20px" marginLeft="10px" fontWeight="bold">{props.title}</MySpan>}
            loadMore={props.loadMore}
            dataSource={props.messageList.toJSON()}
            itemLayout="horizontal"
            renderItem={item =><MessageListItem item={item}/>}
            locale={{emptyText: '暂无数据'}}
        />
    );
}
export default MessageListUI;
