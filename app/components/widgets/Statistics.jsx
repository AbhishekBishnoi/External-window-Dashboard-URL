import React from 'react';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import Statistic from 'semantic-ui-react/dist/commonjs/views/Statistic';
import forEach from 'lodash/forEach';
import DashboardStore from '../../stores/Dashboard.jsx';

const socket = io.connect();
export default class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            items: [
                { label: 'Positions', value: 341 },
                { label: 'Trades', value: 42453 },
                { label: 'MTM', value: 102232921 },
                { label: 'Total VAR', value: 96462856 },
                { label: 'PnL', value: 342121 }
            ],
            ...DashboardStore.getState()
        };
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

    updateCards(factor) {
        forEach(this.state.items, function (item) {
            item.value = Math.round(item.value + item.value * parseFloat(factor));
        });
        this.setState({ items: this.state.items });
    }

    render() {
        let stats = this.state.items.map(function (stat, index) {
            let val = Number(stat.value).toLocaleString('en');
            return (
                <Statistic key={'stat' + index} value={val} label={stat.label} />
            );
        });
        return (
            <div className="statistics">
                <Segment inverted={this.state.theme == 'dark'}>
                    <Statistic.Group inverted={this.state.theme == 'dark'} color='green' widths="five" size="tiny" >
                        {stats}
                    </Statistic.Group>
                </Segment>
            </div>
        );

    }
}
