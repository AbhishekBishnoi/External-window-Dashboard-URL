import React from 'react';
import random from 'lodash/random';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';

export default class Sparkline extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let data = [];
        for (var i = 0; i < 15; i++) {
            data.push(random(25));
        }
        return (
            <div>
                {!this.props.node.floating ? <Sparklines data={data}>
                    <SparklinesLine color="#4bc0c0" />
                    <SparklinesSpots />
                </Sparklines> : null}
            </div>
        );

    }
}

