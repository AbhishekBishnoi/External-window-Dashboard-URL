import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import ReactDOM from 'react-dom';
import "ag-grid-enterprise";
import axios from "axios";
import faker from 'faker';
import FileSaver from 'file-saver';
import classnames from 'classnames';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';

import CheckBox from './CheckboxHeader.jsx';
import LazyList from './LazyList.jsx';
import isNumber from 'lodash/isNumber';
import last from 'lodash/last';
import find from 'lodash/find';
import reduce from 'lodash/reduce';

import Constants from '../../../utils/Constants.jsx';

import DashboardStore from '../../../stores/Dashboard.jsx';
import DashboardActions from '../../../actions/Dashboard.jsx';

import { LicenseManager } from "ag-grid-enterprise/main";
LicenseManager.setLicenseKey(Constants.KEYS.AG_GRID_LICENCE);

// if (document && document.documentElement) {
const PerfectScrollbar = require('perfect-scrollbar');
// }

const socket = io.connect();
let columnDefs = [
    {
        headerName: "#",
        checkboxSelection: true,
        field: "#",
        width: 50,
        suppressMenu: true,
        pinned: true,
        toolPanelClass: 'tp-hide',
        headerComponentFramework: CheckBox,
        checked: true
    },
    { headerName: "No", field: "id", width: 50, sort: "asc", filter: 'text', checked: true },
    { headerName: "Name", field: "name", width: 150, filter: 'text', checked: true },
    { headerName: "Email", field: "email", width: 90, filter: 'text', checked: true },
    { headerName: "Job Title", field: "title", width: 120, filter: 'text', checked: true },
    { headerName: "Account #", field: "account", width: 90, filter: 'text', checked: true },
    { headerName: "Transaction", field: "transaction", width: 110, filter: 'text', checked: true },
    { headerName: "Amount", field: "amount", width: 110, filter: 'number', checked: true }
];
export default class InfiniteGrid extends React.Component {

    constructor(props) {
        super(props);
        var me = this;
        this.state = this.getPropsFromStores();
        this.lastId = 0;
        for (var i = 0; i < 2000; i++) {
            columnDefs.push({ headerName: faker.random.word(), field: faker.random.word(), checked: true });
        }
        this.onChange = this.onChange.bind(this);
        this.dataSource = {
            rowCount: null,
            getRows: (params) => {
                let users = [];
                let startId = params.startRow;
                for (var i = 0; i < 100; i++) {
                    users.push(this.generateFakeUser(++startId));
                }
                // let url = Constants.URL.GET_NEXT_ROWS;
                // axios.get(url, {
                //     params: {
                //         lastId: this.lastId
                //     }
                // }).then((resp) => {
                // var id = this.lastId;
                // users.forEach(function (item) {
                //     item.id = ++id;
                // }, this);
                // this.lastId = last(users).id;

                params.successCallback(users);
                if (PerfectScrollbar)
                    PerfectScrollbar.update(me.viewport);
                // });
            }
        };
    }

    generateFakeUser(id) {
        return {
            id: id,
            name: faker.name.findName(),
            email: faker.internet.email(),
            title: faker.name.jobTitle(),
            account: faker.finance.account(8),
            transaction: faker.finance.transactionType(),
            amount: faker.finance.amount(1000, 10000, 2, '$')
        }
    }

    getPropsFromStores() {
        return {
            ...DashboardStore.getState()
        };
    }

    onGridReady(params) {
        this._api = params.api;
        this._columnApi = params.columnApi;
    }

    onChange(state) {
        this.setState(state);
    }

    componentDidMount() {
        DashboardStore.listen(this.onChange);
        this.viewport = ReactDOM.findDOMNode(this.refs.aggridinfinite)
            .querySelector('.ag-body-viewport');
        if (PerfectScrollbar)
            PerfectScrollbar.initialize(this.viewport);
    }

    componentWillUnmount() {
        DashboardStore.unlisten(this.onChange);
    }

    jumpToRow() {
        var row = parseInt(this.refs.jumpto.value);
        if (isNumber(row)) {
            if (this._api.getInfiniteRowCount() < row) {
                this._api.setInfiniteRowCount(row, true);
            }
            this._api.ensureIndexVisible(row - 1);
        }
    }

    onGridSizeChanged() {
        if (this.viewport && PerfectScrollbar)
            PerfectScrollbar.update(this.viewport);
    }

    onPaginationChanged() {
        if (this._api) {
            var currentPage = this._api.paginationGetCurrentPage();
            DashboardActions.setInfinitePage(currentPage);

        }
    }

    hideColumn(header) {
        var column = find(columnDefs, function (column) {
            return column.headerName == header;
        });
        this._columnApi.setColumnVisible(column.field, !column.checked);
        column.checked = !column.checked;
    }

    _downloadUsers(e) {
        // e.preventDefault();
        this.form.submit();
    }

    onSubmit(event) {
        console.log(e);
        event.preventDefault();
        event.stopPropagation();
        return false;
    }

    render() {

        const styles = {
            grid: {
                height: '100%',
                paddingBottom: '40px'
            },
            jump: {
                float: 'right',
                height: 21
            },
            rowno: {
                marginLeft: 10
            }
        };


        let gridOptions = {
            overlayLoadingTemplate: '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>',
            rowSelection: 'multiple',
            rowHeight: 22,
            rowModelType: 'infinite',
            paginationPageSize: 100,
            pagination: true,
            cacheBlockSize: 100,
            infiniteInitialRowCount: 1,
            datasource: this.dataSource
        };

        return (
            <div style={styles.grid} className={"ag-" + this.state.theme} {...this.props}>
                <h3 className="grid-item-header">
                    Infinite Grid
                    <Icon name="download" size="small" className="filter-col" style={{ lineHeight: '21px' }} onClick={this._downloadUsers.bind(this)} />
                    <form onSubmit={this.onSubmit.bind(this)} action={"/api/user/allusers"} method={"POST"} style={{ display: 'none' }} ref={(form) => { this.form = form; }}></form>
                    <Popup
                        on='click'
                        position='top right'
                        trigger={<Icon name="list ul" size="small" className="filter-col" style={{ lineHeight: '21px' }} />}
                        content={<LazyList hideColumn={this.hideColumn.bind(this)} items={columnDefs} />}>
                    </Popup>
                    <span style={styles.jump}>
                        Jump to Row:
                        <input type="text" className="jumpto" ref="jumpto" style={styles.rowno}></input>
                        <span className="go-btn" onClick={this.jumpToRow.bind(this)}>Go</span>
                    </span>

                </h3>

                <AgGridReact
                    ref="aggridinfinite"
                    onGridSizeChanged={this.onGridSizeChanged.bind(this)}
                    onGridReady={this.onGridReady.bind(this)}
                    onPaginationChanged={this.onPaginationChanged.bind(this)}
                    gridOptions={gridOptions}
                    suppressMenuColumnPanel={true}
                    columnDefs={columnDefs}
                >
                </AgGridReact>
            </div>
        );
    }


}