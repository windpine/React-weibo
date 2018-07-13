import React from 'react';
import {Spin} from 'antd'
import Loadable from 'react-loadable';

const LoadableComponent = Loadable({
    loader:()=>import('./Register.js'),
    loading(){
        return (
            <div>
                <Spin/>
            </div>
        )
    }
})

export default ()=><LoadableComponent/>