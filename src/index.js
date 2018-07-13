import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import {BrowserRouter,Route} from 'react-router-dom';
import './index.css';
import {Layout} from 'antd';
import 'antd/dist/antd.css'
import Welcome from './pages/welcome/Welcome'
import HomeUI from './pages/home/HomeUI'
import MyFooter from "./common/footer";
import Message from './pages/message/Message';

const Index = (
    <Provider store={store}>
        <div>
            <Layout className="layout">
                <BrowserRouter>
                    <div>
                        <Route path='/welcome' exact component={Welcome}/>
                        <Route path='/home' exact component={HomeUI}/>
                        <Route path='/' exact render={()=><div>无指定路由</div>}/>
                        <Route path='/message' exact component = {Message}/>
                    </div>
                </BrowserRouter>
                <MyFooter/>
            </Layout>
        </div>
    </Provider>
)

ReactDOM.render(Index, document.getElementById('root'));

