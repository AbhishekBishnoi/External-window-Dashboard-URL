import alt from '../alt.jsx';
import axios from 'axios';

import Constants from '../utils/Constants.jsx';

class Dashboard {
    constructor() {
        this.generateActions(
            'getMasterDataSuccess',
            'toggleServiceSuccess',
            'toggleSettingsPanel',
            'toggleFrequencySuccess',
            'setRangeSuccess',
            'addNotification',
            'resetNotification',
            'getNext100RowsSuccess',
            'getUsersSuccess',
            'setInfinitePage',
            'addSelectedPage',
            'removeSelectedPage',
            'setTheme'
        );
    }

    getUserNames() {
        let url = Constants.URL.GET_USERS;
        axios.get(url).then((resp) => {
            this.getUsersSuccess(resp.data);
        });
    }

    getMasterData() {
        let url = Constants.URL.GET_MASTER_DATA;
        axios.get(url).then((resp) => {
            this.getMasterDataSuccess(resp.data);
        });
    }

    togglePumpingService(toggle) {
        let url = Constants.URL.TOGGLE_SERVICE;
        axios.post(url, { start: toggle }).then((resp) => {
            this.toggleServiceSuccess(toggle);
        });
    }

    toggleFrequency(frequency) {
        let url = Constants.URL.TOGGLE_SERVICE;
        axios.post(url, { start: true, frequency: frequency }).then((resp) => {
            this.toggleFrequencySuccess(frequency);
        });
    }

    setRange(name, value) {
        let url = Constants.URL.SET_RANGE;
        axios.post(url, { name: name, value: value }).then((resp) => {
            this.setRangeSuccess({ name: name, value: value });
        });
    }

    getNext100Rows(successCB, lastId) {

    }
}

export default alt.createActions(Dashboard);