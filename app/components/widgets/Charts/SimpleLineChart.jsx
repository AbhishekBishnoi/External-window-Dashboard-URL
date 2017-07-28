import React from 'react';
import LineChart from 'recharts/lib/chart/LineChart';
import Tooltip from 'recharts/lib/component/Tooltip';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import Line from 'recharts/lib/cartesian/Line';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Legend from 'recharts/lib/component/Legend';
import forEach from 'lodash/forEach';
import cloneDeep from 'lodash/cloneDeep';
import moment from 'moment';
const socket = io.connect();
export default class SimpleLineChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { name: '12:00PM', PnL: 65, Asset: 15, amt: 2400 },
                { name: '1:00PM', PnL: 59, Asset: 29, amt: 2210 },
                { name: '2:00PM', PnL: 80, Asset: 30, amt: 2290 },
                { name: '3:00PM', PnL: 81, Asset: 41, amt: 2000 },
                { name: '4:00PM', PnL: 56, Asset: 86, amt: 2181 },
                { name: '5:00PM', PnL: 55, Asset: 45, amt: 2500 },
                { name: '6:00PM', PnL: 40, Asset: 60, amt: 2100 }
            ]
        };
    }

    updateChart() {
        let data = cloneDeep(this.state.data);
        data.splice(0, 1);
        var factor = (Math.random() * 5).toFixed(2);
        let PnL = parseFloat((40 + 40 * parseFloat(factor)).toFixed(2));
        var multiplier = (Math.random() * 5).toFixed(2);
        let Asset = parseFloat((60 + 60 * parseFloat(multiplier)).toFixed(2));
        data.push({ name: moment().format('h:mm:ss'), PnL: PnL, Asset: Asset });
        this.setState({ data: data });
    }

    componentDidMount() {
        // let me = this;
        // socket.on('tick', me.updateChart.bind(me));
    }

    componentWillUnmount() {
        socket.off('tick');
    }

    render() {
        return (
            <div {...this.props}>
                <h3 className="grid-item-header">Trend Analysis - ReCharts</h3>
                <ResponsiveContainer width="100%" minHeight={300}>
                    <LineChart data={this.state.data} margin={{ top: 5, right: 0, left: 0, bottom: 5 }} isAnimationActive={false}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="PnL" stroke="#8884d8" isAnimationActive={false} />
                        <Line type="monotone" dataKey="Asset" stroke="#82ca9d" isAnimationActive={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    }
}
