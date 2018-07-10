import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store'
import './index.css';
import { Layout} from 'antd';
import 'antd/dist/antd.css'
import MyHeader from './common/header';
import MyFooter from './common/footer';
import MyContent from './pages/content';


const App = (
    <Provider store={store}>
        <div>
            <Layout className="layout">
                <MyHeader/>
                <MyContent/>
                <MyFooter/>
            </Layout>
        </div>
    </Provider>
)

ReactDOM.render(App, document.getElementById('root'));

