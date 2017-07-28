import React from 'react';

export default class SelectFilter extends React.Component {

    onParentModelChanged(parentModel) {
        // When the filter is empty we will receive a null message her
        if (!parentModel) {
            this.select.value = '';
            this.currentValue = null;
        } else {
            this.select.value = parentModel.filter + '';
            this.currentValue = parentModel.filter;
        }
    }

    render() {
        return (
            <div>
                <select ref={(select) => { this.select = select; }} >
                    <option value="booked">Booked</option>
                    <option value="whatIf">whatIf</option>
                </select>
            </div>
        );
    }
}
