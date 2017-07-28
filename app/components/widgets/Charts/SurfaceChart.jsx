import React from 'react';
import { Line, defaults } from 'react-chartjs-2';
import forEach from 'lodash/forEach';

// Disable animating charts by default.
defaults.global.defaultFontColor = 'rgba(255,255,255,0.75)';
const socket = io.connect();
export default class SurfaceChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                type: 'line',
                labels: ['12:00PM', '1:00PM', '2:00PM', '3:00PM', '4:00PM', '5:00PM', '6:00PM'],
                datasets: [
                    {
                        label: 'PnL Trend',
                        type: 'line',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(222,142,12,0.4)',
                        borderColor: 'rgba(222,145,12,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [65, 59, 80, 81, 56, 55, 40]
                    },
                    {
                        label: 'Asset Trend',
                        type: 'line',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [15, 29, 30, 41, 86, 45, 60]
                    }
                ]
            }
        };
    }

    updateChart(factor) {
        forEach(this.state.data.datasets, function (dataset) {
            let modifiedData = dataset.data.map(function (item) {
                return parseFloat((item + item * parseFloat(factor)).toFixed(2));
            });
            dataset.data = modifiedData;
        });

        this.setState({ data: this.state.data });
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
                <h3 className="grid-item-header">Trend Analysis - ChartJS</h3>
                <Line data={this.state.data} options={{
                    maintainAspectRatio: true
                }} />
            </div>
        );
    }
}

