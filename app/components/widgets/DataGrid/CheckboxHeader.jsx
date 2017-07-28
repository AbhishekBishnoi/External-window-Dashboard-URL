import React from 'react';

import DashboardActions from '../../../actions/Dashboard.jsx';
import DashboardStore from '../../../stores/Dashboard.jsx';
export default class CheckboxHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = DashboardStore.getState();
        this._api = props.column.gridOptionsWrapper.gridOptions.api;
        this.onChange = this.onChange.bind(this);
    }
    onChange(state) {
        this.setState(state);
    }
    onCheckboxChanged() {
        var isChecked = this.chkbox_header.checked;
        var currentPage = this._api.paginationGetCurrentPage();
        var rowNodes = this._api.getModel().virtualPageCache.pages[currentPage].rowNodes;
        rowNodes.forEach(function (row) {
            row.setSelected(isChecked);
        });
        if (isChecked) {
            DashboardActions.addSelectedPage(currentPage);
        } else {
            DashboardActions.removeSelectedPage(currentPage);
        }
    }
    componentDidMount() {
        DashboardStore.listen(this.onChange);
    }
    componentWillUnMount() {
        DashboardStore.unlisten(this.onChange);
    }
    render() {
        var currentPage = this._api.paginationGetCurrentPage();
        var isHeaderChecked = this.state.selectedPages.indexOf(currentPage) >= 0;
        return (
            <div>
                <input style={{ verticalAlign: 'middle' }}
                    checked={isHeaderChecked}
                    type="checkbox"
                    ref={(input) => { this.chkbox_header = input; }}
                    onChange={this.onCheckboxChanged.bind(this)} />
            </div>
        );
    }
}
