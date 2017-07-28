import React from 'react';

export default class SelectCheckbox extends React.Component {



    render() {
        let styles = {
            checkbox: {
                textAlign: 'center',
                lineHeight: '22px'
            }
        };
        return (
            <div style={styles.checkbox}>
                {!this.props.node.floating ?
                    <input type="checkbox" /> : 'Count: ' + this.props.value}
            </div>
        );
    }
}
