import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-enterprise";

import { connect } from 'react-redux';
import cloneDeep from "lodash/cloneDeep";
import orderBy from 'lodash/orderBy';

import ReactDOM from 'react-dom';
import ColDefFactory from './ColDefFactory.jsx';

import DataService from '../../../services/DataService.jsx';

import Constants from '../../../utils/Constants.jsx';

import DashboardStore from '../../../stores/Dashboard.jsx';
import classnames from 'classnames';
import { LicenseManager } from "ag-grid-enterprise/main";
LicenseManager.setLicenseKey(Constants.KEYS.AG_GRID_LICENCE);

import FloatingTextBox from './FloatingTextBoxV2.jsx';

import filter from 'lodash/filter';
import toLower from 'lodash/toLower';
import reduce from 'lodash/reduce';
import first from 'lodash/first';
import keys from 'lodash/keys';

const socket = io.connect();
const PerfectScrollbar = require('perfect-scrollbar');
class ImmutableGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [
                { headerName: "No", field: "id", filter: 'number' },
                { headerName: "Name", field: "name", filter: 'text' },
                { headerName: "Email", field: "email" },
                { headerName: "Job Title", field: "title" },
                { headerName: "Account #", field: "account" },
                { headerName: "Transaction", field: "transaction" },
                { headerName: "Amount", field: "amount", enableCellChangeFlash: true }
            ]
        };
        this.getRowNodeId = this.getRowNodeId.bind(this);
        this.onGridReady = this.onGridReady.bind(this);
        this.updateGrid = this.updateGrid.bind(this);
        this.dataService = new DataService();
        this.pages = {
            start: 0,
            fetch: true
        };
        this.pageSize = 100;
        this.dataSource = {
            rowCount: null,
            getRows: (params) => {
                //Check if the pagination data has changed, for e.g. page 1 -> page 2, and fetch is set to true
                if (this.pages.fetch) {
                    // if yes, Can be a server side call with promise
                    this.dataService.getUsersByPage(this.pages.start, this.pages.start + this.pageSize);
                }
                //on resolve of promise from api 
                this.pages.fetch = false;
                let processedRows = this.processRowData(this.props.rowData, params.sortModel, params.filterModel);
                params.successCallback(processedRows, -1);
            }
        };
    }

    processRowData(data, sortModel, filterModel) {
        var filteredArr, sortedArr;
        if (keys(filterModel).length > 0) {
            if (filterModel.name) {
                filteredArr = filter(data, (row) => {
                    return toLower(row.name).indexOf(toLower(filterModel.name.filter)) >= 0;
                });
            }
            if (filterModel.id) {
                filteredArr = filter(data, (row) => {
                    return row.id == filterModel.id.filter;
                });
            }
        } else {
            filteredArr = data;
        }

        if (sortModel.length > 0) {
            sortedArr = orderBy(filteredArr, [sortModel[0].colId], [sortModel[0].sort]);
        }
        return sortedArr || filteredArr;

    }

    getRowNodeId(data) {
        return data.id;
    }

    onGridReady(params) {
        this._api = params.api;
        this._columnApi = params.columnApi;
        this.autoSizeColumns();
        this._api.setDatasource(this.dataSource);
        this._api.setSortModel([{ colId: 'name', sort: 'desc' }]);
        this._api.setFilterModel({
            id: {
                filter: "25"
            }
        });
        socket.on('delta', this.updateGrid);
    }

    autoSizeColumns() {
        this._api.sizeColumnsToFit();
    }

    updateGrid(payload) {
        this.dataService.updateUser(payload);
        if (this._api) {
            var updatedNodes = [];
            this._api.forEachNode(function (node) {
                var data = node.data;
                if (data && data.id == payload.id) {
                    data.amount += payload.delta;
                    //This refreshes only the changed Cell instead of the entire row. 
                    node.setDataValue('amount', data.amount);
                }
            });
        }
    }

    gotoNext() {
        this.pages.start += this.pageSize;
        this.pages.fetch = true;
        this._api.paginationGoToNextPage();
    }

    gotoPrev() {
        this.pages.start -= this.pageSize;
        this.pages.fetch = true;
        this._api.paginationGoToPreviousPage();
    }

    render() {
        const styles = {
            container: {
                height: '100%',
                paddingBottom: '40px'
            },
            grid: {
                display: 'inline-block',
                height: '100%',
                width: '100%'
            },
            panel: {
                width: '200px',
                padding: '10px',
                verticalAlign: 'top',
                height: '100%',
                display: 'inline-block'
            },
            floatingHeader: {
                float: 'right'
            }
        };

        const gridOptions = {
            overlayLoadingTemplate: '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>',
            rowSelection: 'single',
            rowDeselection: true,
            rowHeight: 22,
            rowModelType: 'infinite',
            paginationPageSize: 100,
            pagination: true,
            cacheBlockSize: 100,
            maxBlocksInCache: 1,
            enableServerSideSorting: true,
            enableServerSideFilter: true,
            floatingFilter: true,
            datasource: this.dataSource,
            suppressPaginationPanel: true,
            getRowNodeId: this.getRowNodeId,
            defaultColDef: {
                enableCellChangeFlash: true
            }
        };

        // const gridCls = classnames({
        //     "ag-dark": this.state.theme == 'dark',
        //     "ag-light": this.state.theme == 'light'
        // });

        return (
            <div className="ag-dark" style={styles.container}>
                <h3 className="grid-item-header">
                    ImmutableGrid
                    <span style={styles.floatingHeader}>
                        &nbsp;
                    <span onClick={this.gotoPrev.bind(this)}>Prev</span>
                        &nbsp;
                    <span onClick={this.gotoNext.bind(this)}>Next</span>
                    </span>
                </h3>
                <AgGridReact
                    gridOptions={gridOptions}
                    animateRows
                    enableImmutableMode="true"
                    deltaRowDataMode
                    rowData={this.state.currentRows}
                    onGridReady={this.onGridReady}
                    columnDefs={this.state.columnDefs}
                >
                </AgGridReact>
                <div>
                    <span>{'Showing ' + (this.pages.start + 1) + ' to ' + (this.pages.start + this.pageSize)}</span>
                </div>
            </div>
        );
    }
}
export default connect(
    (state) => {
        return {
            rowData: state.rowData
        }
    }
)(ImmutableGrid);