import React from 'react';
import NotificationSystem from 'react-notification-system';
import random from 'lodash/random';

import DashboardActions from '../../actions/Dashboard.jsx';

const types = {
    1: 'success',
    2: 'warning',
    3: 'error',
    4: 'info'
}
const messages = {
    1: <div><a>Entity - 1 FX</a>&nbsp;breached the 5% threshold!</div>,
    2: <div><a>Entity - 2 Prime</a> breached the 10% threshold!</div>,
    3: <div><a>Entity - 3 FT</a> breached 5% threshold!</div>,
    4: <div><a>Entity - 2 Prime</a> breached 7% threshold!</div>
}
export default class Notification extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.getPropsfromStores();
    }

    getPropsfromStores() {
        return {
            ...{
                notification: null,
                notifications: null
            }
        }
    }

    addNotification() {
        let msg = messages[random(1, 4)];
        this._notificationSystem.addNotification({
            children: msg,
            position: 'br',
            level: types[random(1, 4)],
            dismissible: true
        });
        DashboardActions.addNotification(msg);
    }

    clearNotifications() {
        this._notificationSystem.clearNotifications();
    }

    componentDidMount() {
        var me = this;
        this._notificationSystem = this.refs.notificationSystem;
        this.notificationService = setInterval(function () {
            // me.addNotification();
        }, 45000);
    }

    componentWillUnmount() {
        this.clearNotifications();
        window.clearInterval(this.notificationService);
    }

    render() {
        let self = this;

        let style = {
            NotificationItem: {
                DefaultStyle: {
                    background: '#252729',
                    color: '#FFF'
                }
            },
            Dismiss: {
                DefaultStyle: {
                    backgroundColor: '#252727',
                    color: '#ccc'
                }
            }
        }

        return (
            <NotificationSystem ref='notificationSystem' style={style} />
        );
    }
}