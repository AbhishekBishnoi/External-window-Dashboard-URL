import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import plotly from 'plotly.js/lib/index-gl3d';
import axios from 'axios';

export default class ThreeDCharts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        let data = [{
            z: [
                [102.8, 85.22, 93.75, 93.05, 92.43, 91.85, 90.9, 96.72, 89.56, 88.4, 87.53, 86.8, 86.2, 85.68],
                [93.88, 81.93, 83.93, 83.38, 82.95, 82.62, 82.15, 87.07, 81.7, 81.56, 81.52, 81.6, 81.8, 81.9],
                [64.8, 56.62, 60.68, 60.15, 59.67, 59.3, 58.67, 63.35, 57.88, 57.4, 57.1, 56.9, 56.78, 56.67, 58.22],
                [59.55, 46.6, 55, 53.9, 52.95, 52.17, 50.88, 59.95, 49.2, 48.17, 47.53, 47.15, 46.88, 46.7, 49.92],
                [54.38, 40.42, 51.1, 49.67, 48.47, 47.43, 45.8, 57.38, 43.65, 42.4, 41.6, 41.1, 40.78, 40.58, 44.58],
                [50.07, 35.95, 48.38, 46.75, 45.38, 44.18, 42.3, 55.47, 39.78, 38.3, 37.4, 36.8, 36.43, 36.12, 40.88],
                [45.85, 32.95, 45.67, 44.03, 42.62, 41.43, 39.47, 52.93, 36.93, 35.4, 34.45, 33.82, 33.43, 33.15, 38.03],
                [42.57, 30.65, 43.62, 41.95, 40.47, 39.22, 37.25, 51.1, 34.6, 33, 32.05, 31.45, 31.08, 30.8, 35.75],
                [39.75, 28.75, 41.83, 40.12, 38.68, 37.43, 35.38, 49.3, 32.7, 31.12, 30.15, 29.58, 29.17, 28.92, 33.85],
                [37.25, 27.3, 40.1, 38.42, 36.95, 35.7, 33.72, 47.5, 31.05, 29.5, 28.58, 28, 27.65, 27.42, 32.2],
                [33.43, 25.17, 37.42, 35.67, 34.22, 32.95, 30.92, 44.85, 28.27, 26.8, 26, 25.55, 25.33, 25.2, 29.42],
                [30.77, 23.27, 35.3, 33.72, 32.38, 31.2, 29.33, 42.2, 26.8, 25.35, 24.5, 23.95, 23.62, 23.42, 27.9],
                [28.5, 22.23, 33.3, 31.75, 30.45, 29.33, 27.58, 40.08, 25.25, 23.95, 23.2, 22.75, 22.48, 22.33, 26.25]
            ],
            x: [
                0, '1Y', '2Y', '3Y', '4Y', '5Y', '6Y', '7Y', '8Y', '9Y', '10Y', '12Y', '15Y', '20Y'
            ],
            colorscale: [[0, 'rgb(0,255,0)'], [0.35, 'yellow'], [0.5, 'orange'], [0.6, 'brown'], [0.8, 'darkbrown'], [1, 'red']],
            type: 'surface'
        }];
        var layout = {
            title: 'IR Vol Cap Chart',
            paper_bgcolor: 'rgba(55,55,55,0.9)',
            autosize: true,
            font: {
                color: 'rgba(252,243,243,1)'
            },
            margin: {
                l: 25,
                r: 20,
                b: 25,
                t: 40,
            }
        };
        plotly.newPlot(this.container, data, cloneDeep(layout));
        this.container.on('plotly_relayout', function (a, b, c) {
            console.log(a);
            console.log(b);
            console.log(c);
        });
    }

    componentWillUnmount() {
        // plotly.purge(this.container);
    }

    render() {
        return (
            <div {...this.props}>
                <h3 className="grid-item-header">3D Surface Chart - Plotly</h3>
                <div ref={(node) => this.container = node} />
            </div>

        );
    }
}