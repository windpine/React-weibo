import React from 'react'
import {List} from 'antd'


const MessageList = (props)=>{
    return(
        <List
            className="Message"
            loading={props.loading}
            header={<span>{props.title}</span>}
            loadMore={props.loadMore}
            dataSource={props.messageList.toJSON()}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        title={item.UserName}
                        description={item.content}
                    />
                </List.Item>
            )
            }
        />
    );
}

export default MessageList;