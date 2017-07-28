import React from 'react';
import Sparklines from './widgets/DataGrid/Sparklines.jsx';

import Archiver from './widgets/Archiver.jsx';
//LineCharts
//Echarts
import LineChart from './widgets/Charts/LineChart.jsx';

//Chart.js
import SurfaceChart from './widgets/Charts/SurfaceChart.jsx';

//Recharts
import SimpleLineChart from './widgets/Charts/SimpleLineChart.jsx';

//Container Query
import ContainerQComponent from './widgets/ContainerComponent.jsx';

import ThreeDChart from './widgets/Charts/3DChart.jsx';
import TimeSeries from './widgets/Charts/TimeSeries.jsx';
import Calendar from './widgets/Calendar.jsx';
import RiskDataGrid from './widgets/DataGrid/RiskDataGrid.jsx';
import NestedDataGrid from './widgets/DataGrid/NestedDataGrid.jsx';
import InfiniteGrid from './widgets/DataGrid/InfiniteGrid.jsx';
import ImmutableGrid from './widgets/DataGrid/ImmutableGrid.jsx';
import GridLayout from './widgets/GridLayout.jsx';
import Header from './widgets/Header.jsx';
import SideMenu from './widgets/SideMenu.jsx';
import Treemap from './widgets/TreeMap/TreeMap.jsx';
import DualPieChart from './widgets/Charts/PieChart.jsx';

import ContactForm from './widgets/ContactForm.jsx';

import Statistics from './widgets/Statistics.jsx';
import Notification from './widgets/Notification.jsx';

import DashboardStore from '../stores/Dashboard.jsx';
import DashboardActions from '../actions/Dashboard.jsx';

var Menu = require('react-burger-menu').Slide;

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getPropsfromStores();
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getPropsfromStores() {
        return {
            ...DashboardStore.getState()
        };
    }

    onChange(state) {
        this.setState(state);
    }

    componentDidMount() {
        DashboardStore.listen(this.onChange);
        DashboardActions.getMasterData();
    }

    componentWillUnmount() {
        DashboardStore.unlisten(this.onChange);
    }

    handleSubmit = (values) => {
        console.log(values);
    }

    _downloadZip() {
        var zipper = new Archiver();
        zipper.zipFiles([
            {
                fileName: 'file1',
                content: 'File 1 Content'
            },
            {
                fileName: 'file2',
                content: 'File 2 Content'
            }, {
                fileName: 'file3',
                content: 'File 3 Content'
            }
        ], 'package.zip');
    }

    render() {
        return (
            <div>
                <Header></Header>
                <Statistics />
                <GridLayout>
                    <div key={'a'} data-grid={{ i: 'a', x: 0, y: 0, w: 6, h: 8, minW: 2, maxW: 12 }}>
                        {/*<button type="button" onClick={this._downloadZip.bind(this)} >Download Zip</button>*/}
                        {/*<ContactForm onSubmit={this.handleSubmit}></ContactForm>*/}
                        <ContainerQComponent />
                    </div>
                    <div key={'i'} data-grid={{ i: 'i', x: 6, y: 0, w: 6, h: 8, minW: 2, maxW: 12 }}>
                        <ImmutableGrid />
                    </div>
                    <div key={'z'} data-grid={{ i: 'z', x: 0, y: 8, w: 12, h: 8, minW: 2, maxW: 12 }}>
                        {/*<ThreeDChart />*/}
                        <RiskDataGrid />
                    </div>
                    <div key={'b'} data-grid={{ i: 'b', x: 6, y: 0, w: 6, h: 12, minW: 2, maxW: 12 }}>
                        <InfiniteGrid />
                        {/*<TimeSeries />*/}
                    </div>
                    {/*<div key={'c'} data-grid={{ i: 'c', x: 0, y: 16, w: 6, h: 8, minW: 2, maxW: 12 }}>
                        <SimpleLineChart />
                    </div>
                    <div key={'c'} data-grid={{ i: 'c', x: 0, y: 6, w: 6, h: 9, minW: 2, maxW: 12 }}>
                        <Treemap />
                    </div>
                    <div key={'d'} data-grid={{ i: 'd', x: 6, y: 6, w: 6, h: 9, minW: 2, maxW: 12 }}>
                        <DualPieChart />
                    </div>
                    <div key={'e'} data-grid={{ i: 'e', x: 6, y: 12, w: 6, h: 8, minW: 2, maxW: 12 }}>
                        <LineChart />
                    </div>
                    <div key={'f'} data-grid={{ i: 'f', x: 0, y: 22, w: 6, h: 9, minW: 2, maxW: 12 }}>
                        <SurfaceChart />
                    </div>
                    <div key={'f'} data-grid={{ i: 'd', x: 0, y: 16, w: 3, h: 9, minW: 2, maxW: 12 }}>
                        <Calendar />
                    </div>
                    <div key={'g'} data-grid={{ i: 'g', x: 0, y: 40, w: 12, h: 8, minW: 2, maxW: 12 }}>

                    </div>
                    <div key={'h'} data-grid={{ i: 'h', x: 6, y: 32, w: 6, h: 8, minW: 2, maxW: 12 }}>
                        <NestedDataGrid />
                    </div>*/}
                </GridLayout>
                <Notification />
            </div>
        );
    }
}
