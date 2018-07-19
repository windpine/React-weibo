import React from 'react'
import{Modal} from 'antd'
import {connect} from 'react-redux'

import * as actionCreators from '../store/actionCreators'

const MyModal = (props)=>{
    return(
        <Modal
            title={props.item.nickName}
            visible={props.visible}
            footer={null}
            onCancel={()=>{
                console.log("隐藏")
                props.handleHideModal()}}
        >
            <p>{props.item.content}</p>
        </Modal>
    )
}
const mapStatusToProps = (state)=>{
    return{
        visible:state.getIn(["message","visibleModal"])
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        handleHideModal(){
            dispatch(actionCreators.getHideModalAction())
        }
    }
}
export default connect(mapStatusToProps,mapDispatchToProps)(MyModal);