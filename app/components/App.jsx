import React from 'react';
import DashboardStore from '../stores/Dashboard.jsx';

export default class App extends React.Component {
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

    render() {
        return (
            <div className={"app " + this.state.theme}>
                {this.props.children}
            </div>
        );
    }
}
