import React from 'react';
import Progress from 'semantic-ui-react/dist/commonjs/modules/Progress';

export default class ProgressBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        };
    }

    refresh(params) {
        this.setState({ value: parseInt(params.value) });
    }

    render() {
        return (
            <Progress value={this.state.value} total='100' progress='percent' autoSuccess indicating />
        );
    }
}
