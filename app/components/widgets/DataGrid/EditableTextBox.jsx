import React from 'react';
export default class EditableTextBox extends React.Component {
    render() {
        return (
            <div>
                <input type="text" defaultValue={this.props.value} />
            </div>
        );
    }
}
