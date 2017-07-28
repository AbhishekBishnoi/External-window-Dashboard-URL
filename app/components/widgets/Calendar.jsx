import React from 'react';
import DatePicker from 'react-datepicker';
import filter from 'lodash/filter';
import moment from 'moment';

class Calendar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let dates = moment().subtract('years', 10).twix().toArray('days');
        let allFirstDates = filter(dates,function (date) {
            return date.date() == 1;
        });
        return (
            <div {...this.props}>
                <h3 className="grid-item-header">Calendar</h3>
                <DatePicker inline readOnly scrollableYearDropdown showMonthDropdown showYearDropdown peekNextMonth={false} highlightDates={allFirstDates} />
            </div>
        );
    }
}

export default Calendar;
