import React from 'react';
import { browserHistory } from 'react-router';

import DashboardActions from '../actions/Dashboard.jsx';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    gotoDashboard() {
        // DashboardActions.togglePumpingService(true);
        DashboardActions.getUserNames();
        browserHistory.push('/dashboard');
    }

    render() {
        return (
            <div className="form">
                <form className="login-form">
                    <img sizes='(max-width: 479px) 77vw, 110px' src='/resources/images/logo.png' srcSet='/resources/images/logo.png 500w' width='110' />
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <button onClick={this.gotoDashboard.bind(this)}>login</button>
                    <p className="message">Not registered? <a href="#">Create an account</a></p>
                </form>
            </div>
        );
    }
}
