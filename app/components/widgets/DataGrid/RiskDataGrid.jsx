import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-enterprise";

import ReactDOM from 'react-dom';
import ColDefFactory from './ColDefFactory.jsx';

import Constants from '../../../utils/Constants.jsx';

import DashboardStore from '../../../stores/Dashboard.jsx';
import classnames from 'classnames';
import { LicenseManager } from "ag-grid-enterprise/main";
LicenseManager.setLicenseKey(Constants.KEYS.AG_GRID_LICENCE);

import reduce from 'lodash/reduce';

// if (document && document.documentElement) {
const PerfectScrollbar = require('perfect-scrollbar');
// }
const socket = io.connect();
export default class RiskDataGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.getPropsFromStores();
        this.onChange = this.onChange.bind(this);
    }

    getPropsFromStores() {
        return {
            ...DashboardStore.getState(),
            ...{
                columnDefs: new ColDefFactory().createColDefs(),
                showToolPanel: false,
                filters: {},
                selectedRow: null
            }
        };
    }

    onGridReady(params) {
        this._api = params.api;
        this._columnApi = params.columnApi;
        this.autoSizeColumns();
        socket.on('tick', this.updateGrid.bind(this));
    }

    onModelUpdated() {
        this.setFooter();
    }

    setFooter() {
        let activeRows = [];
        let totalPrice = 0, avgPnL = 0, totalPnL = 0;
        if (this._columnApi && !this._columnApi.isPivotMode()) {
            if (this._api) {
                this._api.forEachNodeAfterFilter(function (item) {
                    activeRows.push(item.data);
                });
            }
            if (activeRows.length > 0) {
                totalPrice = reduce(activeRows, function (sum, item) {
                    return sum + item.Price;
                }, 0);

                totalPnL = reduce(activeRows, function (sum, item) {
                    return sum + item.PnL;
                }, 0);
                avgPnL = totalPnL / activeRows.length;

            }
            if (this._api) {
                this._api.setFloatingBottomRowData([{
                    Price: Number(totalPrice).toLocaleString('en'),
                    Count: activeRows.length,
                    PnL: Number(avgPnL.toFixed(2)).toLocaleString('en'),
                    fullWidth: true
                }]);
                this.autoSizeColumns();
            }
        }
    }

    autoSizeColumns() {
        this._api.sizeColumnsToFit();
    }

    updateGrid(factor) {
        var me = this;

        //Updating Price columns through state and SetRowData API
        /*this.state.masterData.forEach(function (item) {
            var multiplier = (Math.random() * (1.5 + 1.5) - 1.5).toFixed(2);
            if (item.PnL != '-')
                item.PnL = item.PnL + item.PnL * parseFloat(factor * multiplier);
            item.Price = item.Price + item.Price * parseFloat(factor * multiplier);
        });

        if (this._api) {
            this._api.setRowData(this.state.masterData);
            this.autoSizeColumns();
        }*/

        //Updating the Progress Bar Column ONLY

        // at the end of the update below, this array will
        // have all of the items that we updated
        var updatedNodes = [];
        this._api.forEachNode(function (node) {
            var data = node.data;
            if (data) {
                if (Math.random() >= 0.5) {
                    data.Progress += parseInt(factor);
                    updatedNodes.push(node);
                }
            }
        });

        // now tell the grid it needs refresh all these rows
        this._api.refreshCells(updatedNodes, ['Progress']);
    }

    onChange(state) {
        this.setState(state);
    }

    componentDidMount() {
        DashboardStore.listen(this.onChange);
        this.viewport = ReactDOM.findDOMNode(this.refs.aggrid)
            .querySelector('.ag-body-viewport');
        if (document && document.documentElement)
            PerfectScrollbar.initialize(this.viewport);
        let me = this;

    }

    componentWillUnmount() {
        socket.off('tick');
        DashboardStore.unlisten(this.onChange);
    }

    onToggleToolPanel(e) {
        this.setState({
            showToolPanel: event.target.checked
        });
    }

    onToggleInterval(event) {
        console.log(event);
    }

    onFilterChange(a, b, c) {
        var filters = this._api.getFilterModel();
        this.setState({ filters: filters });
    }

    onSetFilter(e) {
        this._api.setFilterModel({
            Type: {
                type: 'equals',
                filter: 'booked'
            }
        });
        this._api.onFilterChanged();
        e.preventDefault();
        return false;
    }

    clearFilters(e) {
        this._api.setFilterModel(null);
        this._api.onFilterChanged();
        e.preventDefault();
        return false;
    }

    onCellClicked(event) {
        if (event.column.colId != "chk_select") {
            event.node.setSelected(true);
        }
    }

    renderFilters() {
        let filters = Object.keys(this.state.filters);
        return <span>{filters.length > 0 ? filters.join() : 'None'}</span>
    }

    aggregationRow(params) {
        if (params.node.floating)
            return <AggregationRow data={params.data} />;
    }

    onSelectionChanged() {
        var selectedRows = this._api.getSelectedRows();
        this.setState({ selectedRow: selectedRows });
    }

    getSelectedRows() {
        return this.state.selectedRow.map((row, index) => {
            return (<div key={index}>
                <p>Portfolio: {row.Portfolio}</p>
                <p>Asset Class: {row['Asset Class']}</p>
                <p>Type: {row.Type}</p>
            </div>);
        });
    }

    componentDidUpdate() {
        window.requestAnimationFrame(() => {
            if (this._api) {
                this._api.doLayout();
                this.autoSizeColumns();
            }
        });
    }

    clearSelection() {
        this._api.deselectAll();
    }

    render() {

        let styles = {
            container: {
                height: '100%',
                paddingBottom: '40px'
            },
            grid: {
                display: 'inline-block',
                height: '100%',
                width: this.state.selectedRow && this.state.selectedRow.length > 0 ? 'calc(100% - 200px)' : '100%'
            },
            panel: {
                width: '200px',
                padding: '10px',
                verticalAlign: 'top',
                height: '100%',
                display: 'inline-block'
            },
            activeFilters: {
                float: 'right'
            },
            clsSelection: {
                float: 'right',
                margin: '0px 20px',
                cursor: 'pointer'
            },
            clearFilter: {
                float: 'right'
            }
        };

        let gridOptions = {
            overlayLoadingTemplate: '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>',
            rowSelection: 'single',
            rowDeselection: true,
            enableFilter: true,
            enableColResize: true,
            pivotMode: true,
            floatingFilter: true,
            enableSorting: true,
            suppressMenu: true,
            rowHeight: '22',
            suppressColumnVirtualization: true,
            onSelectionChanged: this.onSelectionChanged.bind(this),
            isFullWidthCell: function (rowNode) {
                return (rowNode && rowNode.data) ? rowNode.data.fullWidth : false;
            },
            fullWidthCellRendererFramework: this.aggregationRow.bind(this)
        };

        let gridCls = classnames({
            "ag-dark": this.state.theme == 'dark',
            "ag-light": this.state.theme == 'light',
            "pos-drilldown": this.state.selectedRow && this.state.selectedRow.length > 0
        });

        return (
            <div style={styles.container} className={gridCls} {...this.props}>
                <h3 className="grid-item-header">
                    Position Drilldown
                    <span style={styles.activeFilters}>Active Filters: {this.renderFilters()}</span>
                    <span style={styles.clsSelection} onClick={this.clearSelection.bind(this)}>Clear Selection</span>
                </h3>
                <AgGridReact
                    ref="aggrid"
                    onGridReady={this.onGridReady.bind(this)}
                    onCellClicked={this.onCellClicked.bind(this)}
                    showToolPanel={this.state.showToolPanel}
                    gridOptions={gridOptions}
                    columnDefs={this.state.columnDefs}
                    onModelUpdated={this.onModelUpdated.bind(this)}
                    rowData={this.state.masterData}
                    onFilterChanged={this.onFilterChange.bind(this)}>
                </AgGridReact>
                {this.state.selectedRow && this.state.selectedRow.length > 0 &&
                    <div style={styles.panel}>
                        {this.getSelectedRows()}
                    </div>}
                <a href="#" onClick={this.onSetFilter.bind(this)}>Set Type = Booked</a>
                <a href="#" onClick={this.clearFilters.bind(this)} style={styles.clearFilter}>Clear Filters</a>

            </div>
        );
    }
}

class AggregationRow extends React.Component {
    render() {
        let { data } = this.props;
        return (
            <div className="agg-row-bottom">
                <span>Count: {data.Count}</span>
                <span>Sum (Price): {data.Price}</span>
                <span>Avg (PnL): {data.PnL}</span>
            </div>
        )
    }
}