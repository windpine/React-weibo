import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import {BrowserRouter,Route,Redirect} from 'react-router-dom';
import './index.css';
import { Layout} from 'antd';
import 'antd/dist/antd.css'
import Welcome from './pages/welcome/loadable'
import Home from './pages/home/Home'
import MyFooter from "./common/footer";
import ProfileForm from "./pages/profile/components/ProfileForm";
import Profile from "./pages/profile/Profile";
import ProfileUI from "./pages/profile/ProfileUI";

import Register from "./pages/register/loadable";

const Index = (
    <Provider store={store}>
        <div>
            <Layout className="layout">
                <BrowserRouter>
                    <div>
                        <Route path='/welcome' exact component={Welcome}/>
                        <Route path='/home' exact component={Home}/>
                        <Route path='/profile' exact component={ProfileUI}/>
                        <Route path='/register' exact component={Register}/>
                        <Route path='/' exact render={()=><Redirect to='/welcome'/>}/>
                    </div>
                </BrowserRouter>
                <MyFooter/>
            </Layout>
        </div>
    </Provider>
)

ReactDOM.render(Index, document.getElementById('root'));

