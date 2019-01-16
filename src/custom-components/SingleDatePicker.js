import * as React from "react"
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import { SingleDatePicker as ReactSingleDatePicker } from 'react-dates';
import { _, Model } from "@flowable/forms-react";

export default class SingleDatePicker extends Model.FormComponent {

    constructor(props) {
        super(props);
        this.state = {
            focused: true,
        };
        this.onFocusChange = this.onFocusChange.bind(this);
    }

    onFocusChange() {
        // Force the focused states to always be truthy so that date is always selectable
        this.setState({ focused: true });
    }

    isInclusivelyAfterDay(a, b) {
        if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
        return !this.isBeforeDay(a, b);
    }

    isBeforeDay(a, b) {
        if (!moment.isMoment(a) || !moment.isMoment(b)) return false;

        const aYear = a.year();
        const aMonth = a.month();

        const bYear = b.year();
        const bMonth = b.month();

        const isSameYear = aYear === bYear;
        const isSameMonth = aMonth === bMonth;

        if (isSameYear && isSameMonth) return a.date() < b.date();
        if (isSameYear) return aMonth < bMonth;
        return aYear < bYear;
    }

    render() {
        const { config, onChange } = this.props;
        const label = _.get(config, "label");
        const elementId = _.get(config, "id");
        return (
            <div className="flw__component">
                <div className="flw__date-range-picker">
                    <span>{label}</span>
                    <ReactSingleDatePicker
                        date={config.value}
                        onDateChange= {onChange}
                        onFocusChange={this.onFocusChange}
                        focused={true}
                        id={elementId}
                        showDefaultInputIcon={true}
                        inputIconPosition="after"
                        numberOfMonths={1}
                        daySize={50}
                        autoFocus = {true}
                        keepOpenOnDateSelect = {true}
                        transitionDuration={0}
                        isOutsideRange={day =>
                            !this.isInclusivelyAfterDay(day, moment()) ||
                            this.isInclusivelyAfterDay(day, moment().add(2, 'weeks'))
                        }
                        isDayBlocked={day => moment.weekdays(day.weekday()) === 'Friday'}
                        displayFormat="DD.MM.YYYY"
                    />
                </div>
            </div>
        );
    }
}
