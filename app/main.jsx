import React from 'react';
import { Router, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import routes from './routes.jsx';
import { Provider } from "react-redux";
import StoreService from './services/StoreService.jsx';
let store = StoreService.STORE;

/* import OpenFinNewWindow from './components/OpenFinNewWindow.jsx';  */

import axios from 'axios';

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>, document.getElementById('app')
);
