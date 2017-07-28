import React from 'react';
import { browserHistory } from 'react-router';
var BurgerMenu = require('react-burger-menu').slide;
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import Sidebar from 'semantic-ui-react/dist/commonjs/modules/Sidebar';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';

import DashboardStore from '../../stores/Dashboard.jsx';
import DashboardActions from '../../actions/Dashboard.jsx';

export default class SideMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = DashboardStore.getState();
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

    _logout() {
        browserHistory.push('/');
    }

    toggleSettingsModal(toggle) {
        DashboardActions.toggleSettingsPanel(toggle);
    }

    render() {
        let menuColor = this.state.theme == 'dark' ? '#CCC' : '#AAA';
        let styles = {
            bmBurgerBars: {
                background: menuColor
            },
        }
        return (
            <BurgerMenu styles={styles} className={this.state.theme}>
                <a id="home" className="menu-item" href="/">
                    <i className="fa fa-home fa-2x"></i>
                    <span>Dashboard</span>
                </a>
                <a id="about" className="menu-item" href="/about"><i className="fa fa-laptop fa-2x"></i><span>PnL Charts</span></a>
                <a id="contact" className="menu-item" href="/contact"><i className="fa fa-list fa-2x"></i><span>Notifications</span></a>
                <a onClick={this.showSettings} className="menu-item" href=""><i className="fa fa-bar-chart-o fa-2x"></i><span>Graphs and Statistics</span></a>
                <a onClick={this.showSettings} className="menu-item" href=""><i className="fa fa-cog fa-2x"></i><span>Settings</span></a>
                <a onClick={this.showSettings} className="menu-item" href=""><i className="fa fa-info fa-2x"></i><span>Help</span></a>
                <a onClick={this.showSettings} className="menu-item" href=""><i className="fa fa-power-off fa-2x"></i><span>Logout</span></a>
            </BurgerMenu>
        );
    }
}
