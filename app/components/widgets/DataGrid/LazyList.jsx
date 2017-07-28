import React from 'react';
import VirtualizedCheckbox from 'react-virtualized-checkbox'
export default class LazyList extends React.Component {
    constructor(props) {
        super(props);
    }

    onChange(column) {
        this.props.hideColumn(column.headerName);
    }

    render() {
        let { items } = this.props;
        return (
            <div style={{ width: '200px', height: '200px' }}>
                <VirtualizedCheckbox
                    rowHeight={20}
                    items={items}
                    labelKey="headerName"
                    hasButtons={false}
                    hasFilterBox={false}
                    valueKey="headerName"
                    onChange={this.onChange.bind(this)}
                />
            </div>
        );
    }
}
