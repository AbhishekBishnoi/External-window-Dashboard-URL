import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App.jsx';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';


export default (
  <Route path='/' component={App}>
    <IndexRoute component={Login} />
    <Route path='/dashboard' component={Dashboard} />
  </Route>
);
