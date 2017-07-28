import cloneDeep from "lodash/cloneDeep";
import faker from 'faker';
import random from 'lodash/random';
import StoreService from "./StoreService.jsx";
import { updateGrid } from "../actions/DataActions.jsx";

export default class {
    constructor() {
        this.store = StoreService.STORE;

        // create the initial state of the fx data
        this.users = [];
        this.createInitialData();

        // and dispatch it
        // this.store.dispatch(updateGrid(this.users.slice(0, 100)));

        // periodically update the fx and top mover information
        // this.kickOffPeriodicUpdates();
    }

    createInitialData() {
        for (var i = 0; i < 1000; i++) {
            this.users.push({
                id: i,
                name: faker.name.findName(),
                email: faker.internet.email(),
                title: faker.name.jobTitle(),
                account: faker.finance.account(8),
                transaction: faker.finance.transactionType(),
                amount: random(50, 500)
            });
        }
    }

    kickOffPeriodicUpdates() {
        setInterval(() => {
            this.store.dispatch(updateGrid(this.users));
        }, 2500);
    }

    getUsersByPage(start, end) {
        var pagedUsers = this.users.slice(start, end);
        this.store.dispatch(updateGrid(pagedUsers));
    }

    updateUser(payload) {
        let user = find(this.users, { id: payload.id });
        if (user) {
            user.amount += payload.delta;
        }

    }
}