import React from 'react';
import CustomizedLabel from './CustomizedLabel.jsx';
import PieChart from 'recharts/lib/chart/PieChart';
import Tooltip from 'recharts/lib/component/Tooltip';
import Cell from 'recharts/lib/component/Cell';
import Pie from 'recharts/lib/polar/Pie';
import Legend from 'recharts/lib/component/Legend';
import forEach from 'lodash/forEach';

const socket = io.connect();
const colors = {
    green: '#1FDA9A',
    darkgreen: '#00A03E',
    blue: '#0087CB',
    pink: '#FF84FC',
    red: '#FE4365',
    orange: '#FFA200',
    cyan: '#8FD4D9',
    yellow: '#FFCA00'
};

export default class DualPieChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data01:
            [
                { name: 'Bond Future', value: 405, color: 'green' }, { name: 'Equity', value: 302, color: 'darkgreen' },
                { name: 'Bond', value: 298, 'color': 'blue' }, { name: 'Cash', value: 187, 'color': 'pink' }
            ],
            data02: [
                { name: 'USD', value: 2400, 'color': 'red' }, { name: 'AED', value: 4567, 'color': 'orange' },
                { name: 'JPY', value: 2698, 'color': 'cyan' }, { name: 'EUR', value: 5800, 'color': 'yellow' }
            ]

        }
    }

    updateChart(factor) {
        forEach(this.state.data01, function (item) {
            item.value = parseInt(item.value + item.value * parseFloat(factor * 10));
        });
        forEach(this.state.data02, function (item) {
            item.value = parseInt(item.value + item.value * parseFloat(factor * 10));
        });
        this.setState({ data01: this.state.data01, data02: this.state.data02 });
    }

    componentDidMount() {
        // let me = this;
        // socket.on('tick', me.updateChart.bind(me));
    }

    componentWillUnmount() {
        socket.off('tick');
    }

    render() {
        let color = 'green';

        let pies = this.state.data01.map((entry, index) => {
            return <Cell key={`cell-${index}`} fill={colors[entry.color]} />
        });

        let pies2 = this.state.data02.map((entry, index) => {
            return <Cell key={`cell-${index}`} fill={colors[entry.color]} />
        });

        let styles = {
            wrapperStyleObject: {
                background: '#252626'
            },
            labelStyle: {
                color: '#FCFFFA'
            }
        }

        return (
            <div {...this.props}>
                <h3 className="grid-item-header">Position Summary</h3>
                <PieChart width={300} height={300} className="resp-piechart">
                    <Pie label={CustomizedLabel} labelLine={false} data={this.state.data01} fill="url(#colorUv)" cx="50%" cy="50%" outerRadius={80}>
                        {pies}
                    </Pie>
                    <Tooltip labelStyle={{ color: 'white' }} itemStyle={{ background: '#252525' }} wrapperStyle={{ background: '#252525' }} />
                    <Legend />
                </PieChart>
                <PieChart width={300} height={300} className="resp-piechart">
                    <Pie label={CustomizedLabel} labelLine={false} data={this.state.data02} fill="url(#colorPv)" cx="50%" cy="50%" innerRadius={40} outerRadius={80}>
                        {pies2}
                    </Pie>
                    <Tooltip labelStyle={{ color: 'white' }} itemStyle={{ background: '#252525' }} wrapperStyle={{ background: '#252525' }} />
                    <Legend />
                </PieChart>
            </div>
        );
    }

}

