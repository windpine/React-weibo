import React from 'react';
import Loadabel from 'react-loadable';

const LoadableComponent = Loadabel({
    loader:()=>import('./Welcome.js'),
    loading(){
        return (
            <div>loading</div>
        )
    }
})



export default ()=><LoadableComponent/>