import alt from '../alt.jsx';
import forEach from 'lodash/forEach';
import last from 'lodash/last';
import random from 'lodash/random';
import DashboardActions from '../actions/Dashboard.jsx';

class Dashboard {
    constructor() {
        this.bindActions(DashboardActions);
        this.bootStrapStore();
    }

    bootStrapStore() {
        this.masterData = [];
        this.selectedPages = [];
        this.isServiceActive = true;
        this.isSettingModalOpen = false;
        this.frequency = 15;
        this.showToolPanel = false;
        this.minRange = -0.05;
        this.maxRange = 0.05;
        this.notifications = [];
        this.notificationCount = false;
        this.lastId = 0;
        this.theme = 'dark';
    }

    onAddNotification(msg) {
        this.notifications.unshift({ content: msg, createdAt: new Date(), isRead: false });
        this.notificationCount = true;
    }

    onResetNotification() {
        // this.notifications = [];
        forEach(this.notifications, function (notification) {
            notification.isRead = true;
        });
        this.notificationCount = false;
    }

    onSetRangeSuccess(payload) {
        this[payload.name] = payload.value;
    }

    onToggleFrequencySuccess(frequency) {
        this.frequency = frequency;
    }

    onToggleSettingsPanel(toggle) {
        this.isSettingModalOpen = toggle;
    }

    onToggleServiceSuccess(payload) {
        this.isServiceActive = payload;
    }

    onSetTheme(theme) {
        this.theme = theme;
    }

    onGetMasterDataSuccess(data) {
        forEach(data, (item) => {
            if (item.PnL.trim() != '-') {
                var PnL = item.PnL.trim().replace('(', '').replace(')', '').replace(',', '');
                item.PnL = parseFloat(PnL);
            } else {
                item.PnL = 0;
            }
            item.Price = parseFloat(item.Price);
            item.Progress = random(0, 10, false);
        });

        this.masterData = data;
    }

    getNext100RowsSuccess(payload) {
        var id = this.lastId;
        payload.data.forEach(function (item) {
            item.id = ++id;
        }, this);
        this.lastId = last(payload.data).id;
        payload.callback(payload.data, -1);
    }

    onGetUsersSuccess(payload) {
        this.users = payload;
        localStorage.setItem('users', payload);
    }

    onSetInfinitePage(page) {
        this.curinfinitePage = page;
    }

    onAddSelectedPage(page) {
        this.selectedPages.push(page);
    }

    onRemoveSelectedPage(currentPage) {
        var index = this.selectedPages.indexOf(currentPage);
        if (index > -1) {
            this.selectedPages.splice(index, 1);
        }
    }
}

export default alt.createStore(Dashboard, 'Dashboard');
