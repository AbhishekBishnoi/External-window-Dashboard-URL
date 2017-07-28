import React from 'react';
import Treemap from 'recharts/lib/chart/Treemap';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import forEach from 'lodash/forEach';
import Legend from 'recharts/lib/component/Legend';
import Tooltip from 'recharts/lib/component/Tooltip';
import CustomTooltip from './CustomTooltip.jsx';
import TreeMapLegend from './TreeMapLegend.jsx';

const socket = io.connect();
let data = [
    {
        children: [
            {
                name: 'Entity 1-FX',
                size: 120000000,
                varSize: '120,000,000',
                varlimit: 100000000
            }, {
                name: 'Entity 1-ETF',
                size: 97000000,
                varlimit: 90000000
            }, {
                name: 'Entity 2-Prime',
                size: 56000000,
                varSize: '56,000,000',
                varlimit: 50000000
            }, {
                name: 'Entity 4-Treasury',
                size: 30000000,
                varSize: '30,000,000',
                varlimit: 32000000
            }, {
                name: 'Entity 2-Treasury',
                size: 27500000,
                varSize: '25,000,000',
                varlimit: 28000000
            }, {
                name: 'Entity 2-HFT',
                size: 29000000,
                varSize: '9,000,000',
                varlimit: 29500000
            }, {
                name: 'Entity 2-FX',
                size: 22000000,
                varSize: '22,000,000',
                varlimit: 23500000
            }, {
                name: 'Entity 3-HFT',
                size: 39500000,
                varSize: '37,000,000',
                varlimit: 40000000
            }, {
                name: 'Entity 3-FX',
                size: 45000000,
                varSize: '45,000,000',
                sizelimit: 65000000
            }, {
                name: 'Entity 4-Prime',
                size: 142000000,
                varSize: '142,000,000',
                varlimit: 652500000
            }
        ]
    }
];

const CustomizedContent = (props) => {

    const { root, size, depth, x, y, width, height, index, payload, rank, name, varlimit } = props;
    let color = 'green';
    if (varlimit && depth == 2) {
        if (size > varlimit * 1.1)
            color = 'red';
        else if ((size >= varlimit * 1.05 && size < varlimit * 1.1))
            color = 'yellow';
        else if ((size >= varlimit * 0.95) && (size <= varlimit))
            color = 'darkgreen';
        else if ((size < varlimit * 0.95))
            color = 'green';
    }
    return (
        <g>
            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                fill={"url(#" + color + ")"}
            />

            <text
                x={x + width / 2}
                y={y + height / 2 + 7}
                textAnchor="middle"
                fill="#fff"
                strokeWidth="0"
                fontSize={12}
            >
                {name}
            </text>


        </g>
    );
}

export default class HeatMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: data
        };
    }

    updateChart(factor) {
        forEach(this.state.data[0].children, function (item) {
            item.size = Math.round(item.size + item.size * parseFloat(factor));
            item.varSize = Number(item.size).toLocaleString('en');
        });
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
                <h3 className="grid-item-header">VAR Limits Monitoring</h3>
                <ResponsiveContainer minHeight={270}>
                    <Treemap
                        data={this.state.data}
                        dataKey="size"
                        stroke="#fff"
                        content={<CustomizedContent />}
                    >
                        <defs>
                            <linearGradient id="red" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ff4b1f" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#ff9068" stopOpacity={0.8} />
                            </linearGradient>
                            <linearGradient id="yellow" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#feb645" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#f1e767" stopOpacity={0.8} />
                            </linearGradient>
                            <linearGradient id="green" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#56ab2f" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#a8e063" stopOpacity={0.8} />
                            </linearGradient>
                            <linearGradient id="darkgreen" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#414d0b" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#727a17" stopOpacity={0.8} />
                            </linearGradient>
                        </defs>
                        <Tooltip content={<CustomTooltip />} labelStyle={{ color: '#FFF' }} itemStyle={{ background: '#252525' }} wrapperStyle={{ background: '#252525' }} />
                    </Treemap>
                </ResponsiveContainer>
                <TreeMapLegend />
            </div>
        );

    }

}