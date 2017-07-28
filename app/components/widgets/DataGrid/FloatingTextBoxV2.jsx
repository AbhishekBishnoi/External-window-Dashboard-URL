import React from 'react';
export default class FloatingTextBox extends React.Component {
    constructor(props) {
        super(props);
        this.currentValue = null;
        this.cursorPos;
        this.onFloatingFilterChanged = props.onFloatingFilterChanged;
    }

    onInputBoxChanged() {
        if (this.eFilterInput.value === '') {
            this.onFloatingFilterChanged({});
            return;
        }

        this.currentValue = this.eFilterInput.value;
        this.cursorPos = this.eFilterInput.selectionStart;
        this.onFloatingFilterChanged({
            model: {
                filter: this.currentValue,
                filterType: 'text',
                type: 'contains'

            }
        });
    }

    onParentModelChanged(parentModel) {
        if (!parentModel) {
            this.eFilterInput.value = '';
            this.currentValue = null;
        } else {
            this.eFilterInput.value = parentModel.filter;
            this.currentValue = parentModel.filter;
            this.eFilterInput.setSelectionRange(this.cursorPos, this.cursorPos);
        }
    }

    render() {
        return (
            <div>
                <input id='float-asset' type='text' ref={(input) => { this.eFilterInput = input; }} onInput={this.onInputBoxChanged.bind(this)}></input>
            </div>
        );
    }
}
module.exports = FloatingTextBox;