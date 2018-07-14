import React from 'react'
import {Dropdown,Icon} from 'antd'
import {MyMessageList,MySpan,RightButton,MyIcon} from './styled'
const MENTION = 0;
const COMMENT = 1;
const LIKES = 2;
const ChoiceIcon= function(props){
    switch (props.type){
        case MENTION:
            return <MyIcon type="exclamation-circle-o" />;
        case COMMENT:
            return <MyIcon type="message" />;
        case LIKES:
            return <MyIcon type="like-o" />;
        default:
            return <MyIcon type="loading"/>
    }

}
const MessageList = (props)=>{
    return(
        <MyMessageList
            className="Message"
            loading={props.loading}
            header={<MySpan fontSize="20px" marginLeft="10px" fontWeight="bold">{props.title}</MySpan>}
            loadMore={props.loadMore}
            dataSource={props.messageList.toJSON()}
            itemLayout="vertical"
            renderItem={item => (
                <MyMessageList.Item
                    key={item.messageID}
                    extra={
                        <Dropdown overlay={props.menu}>
                            <RightButton size="small">
                                <Icon type="down" />
                            </RightButton>
                        </Dropdown>
                    }
                >
                    <MyMessageList.Item.Meta
                        title={
                            <MySpan fontSize="15px" marginLeft="50px" fontWeight="bold" marginTop="10px">
                                <ChoiceIcon type={item.type} />
                                <a>{item.srcName}</a>
                            </MySpan>
                         }
                        description={<MySpan fontSize="10px" marginLeft="60px" fontWeight="normal">{item.content}</MySpan>}
                    />

                </MyMessageList.Item>
            )
            }
        />
    );
}

export default MessageList;