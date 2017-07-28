import alt from '../alt.jsx';
import NotificationActions from '../actions/Notification.jsx';

class Notification {
    constructor() {
        this.bindActions(NotificationActions);
        this.bootStrapStore();
    }

    bootStrapStore() {
        this.notifications = [];
    }

    onAddNotification(payload) {
        this.notifications.push(payload);
    }
}

export default alt.createStore(Notification, 'NotificationStore');
