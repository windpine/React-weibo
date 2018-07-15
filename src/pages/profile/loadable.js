import React from 'react';
import Loadabel from 'react-loadable';

const LoadableComponent = Loadabel({
    loader:()=>import('./Profile.js'),
    loading(){
        return (
            <div>loading</div>
        )
    }
})



export default ()=><LoadableComponent/>