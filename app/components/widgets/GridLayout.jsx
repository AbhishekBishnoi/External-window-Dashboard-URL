import React from 'react';
import RiskDataGrid from './DataGrid/RiskDataGrid.jsx';
import DashboardStore from '../../stores/Dashboard.jsx';

var WidthProvider = require('react-grid-layout').WidthProvider;
var ResponsiveReactGridLayout = require('react-grid-layout').Responsive;
ResponsiveReactGridLayout = WidthProvider(ResponsiveReactGridLayout);

export default class GridLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
            ...DashboardStore.getState()
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(state) {
        this.setState(state);
    }

    componentDidMount() {
        DashboardStore.listen(this.onChange);
    }

    componentWillUnmount() {
        DashboardStore.unlisten(this.onChange);
    }

    onLayoutChange(layout, layouts) {
        this.setState({ layouts });
    }

    render() {
        return (
            <ResponsiveReactGridLayout draggableHandle='.grid-item-header' layouts={this.state.layouts} className={"layout " + this.state.theme} cols={this.state.cols} rowHeight={30} width={1300} onLayoutChange={this.onLayoutChange.bind(this)}>
                {this.props.children}
            </ResponsiveReactGridLayout>
        );
    }
}