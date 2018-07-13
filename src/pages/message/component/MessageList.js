import React from 'react'
import {Dropdown,Icon,Button} from 'antd'
import {MyMessageList,MySpan,RightButton,MyIcon} from './styled'

const ChoiceIcon= function(props){
    if(props.type === 'warning')
        return <MyIcon type="question-circle-o" />;
    else if(props.type === 'error')
        return <MyIcon type="close-circle-o" />;
    else
        return <MyIcon type="info-circle-o" />;
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
                                <a>{item.UserName}</a>
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