import React from 'react';

import { FormatTimestamp, GetTimeColorClass } from '../helpers.js';

class TimeDisplayer extends React.Component {
    
    render() {
        var startTimeClass = "p-0 m-0 " + GetTimeColorClass(this.props.input.start_time);
        var endTimeClass = "p-0 m-0 " + GetTimeColorClass(this.props.input.end_time);
        var formatStartTime = FormatTimestamp(this.props.input.start_time)
        var formatEndTime = FormatTimestamp(this.props.input.end_time)

        let startTimeSection = (null)
        if (this.props.input.start_time) {
            startTimeSection =
                <p className={startTimeClass}>
                    <b>Start Time: </b> {formatStartTime}
                </p>
        }

        let endTimeSection = (null)
        if (this.props.input.end_time) {
            endTimeSection =
                <p className={endTimeClass}>
                    <b>End Time: </b> {formatEndTime}
                </p>
        }

        let output = (null)
        
        if (startTimeSection || endTimeSection) {
            output = 
            (<div style={{ fontSize: 15 }} className="pb-3">
                {startTimeSection}
                {endTimeSection}
            </div>)
        }

        return (
            <div>
                {output}
            </div>
        );
    }
}

export default TimeDisplayer;