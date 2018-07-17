import React,{Component} from 'react';

import store from '../../store';
import {connect} from 'react-redux';
import ProfileUI from "./ProfileUI";
import {withRouter} from 'react-router-dom';
import ProfileForm from "./components/ProfileForm";

class Profile extends Component{

    constructor(props){
        super(props);
        // store.subscribe(this.props.handleStoreChange.bind(this))
    }
    render(){
        return (
            <ProfileForm/>
        )
    }
}

const mapStatesToProps = (state)=>{
    return {

    }
}
const mapDispatchToProps = (dispatch)=> {
    return {
        //     handleStoreChange(){
        //         this.setState(store.getState());
        //     },
        // }


    }


}
export default connect(mapStatesToProps,mapDispatchToProps)(withRouter(Profile));