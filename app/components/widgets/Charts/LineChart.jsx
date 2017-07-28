import React from 'react';
import moment from 'moment';
import twix from 'twix';

import ReactECharts from 'echarts-for-react';
import map from 'lodash/map';
export default class LineChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                [new Date('7-1-2014'), 100],
                [new Date('6-3-2014'), 89],
                [new Date('12-12-2014'), 64],
                [new Date('12-06-2015'), 55],
                [new Date('6-13-2016'), 50],
                [new Date('12-1-2016'), 48],
                [new Date('8-1-2018'), 36],
                [new Date('8-1-2020'), 32],
                [new Date('7-1-2022'), 30],
                [new Date('8-1-2024'), 24],
                [new Date('8-1-2029'), 22],
                [new Date('7-1-2039'), 19]
            ]
        }
    }

    getOptions() {
        const option = {
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(13, 120, 0, 0.6)',
                axisPointer: {
                    animation: false,
                    type: 'cross',
                    lineStyle: {
                        color: '#376df4',
                        width: 2,
                        opacity: 1
                    },
                    crossStyle: {
                        color: '#fff'
                    }
                }
            },
            toolbox: {
                show: false
            },
            xAxis: [
                {
                    splitLine: {
                        show: false
                    },
                    type: 'time',
                    axisLabel: {
                        formatter: function (val) {
                            return moment(val).format('YYYY-MM-DD')
                        }
                    },
                    axisLine: { lineStyle: { color: '#fff' } }
                }
            ],
            yAxis: [
                {
                    splitLine: false,
                    type: 'value',
                    axisLine: { lineStyle: { color: '#fff' } }
                }
            ],
            series: [
                {
                    name: 'Year on Year',
                    type: 'line',
                    data: this.state.data
                }]
        }
        return option;
    }

    render() {
        return (
            <div {...this.props}>
                <h3 className="grid-item-header">Year on Year - Echarts</h3>
                <ReactECharts option={this.getOptions()}>
                </ReactECharts>
            </div>
        )
    }
}




