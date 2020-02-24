import React from 'react';

import { FormatTimestamp, GetTimeColorClass } from '../helpers.js';

class TimeDisplayer extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            startTime: '',
            endTime: '',
        };
    }
    
    render() {
        var startTimeClass = "p-0 m-0 " + GetTimeColorClass(this.props.startTime);
        var endTimeClass = GetTimeColorClass(this.props.endTime);

        return (
            <div style={{fontSize: 15}}>
                <p className={startTimeClass}>
                    <b>Start Time: </b> {FormatTimestamp(this.props.startTime)}
                </p>
                <p className={endTimeClass}>
                    <b>End Time: </b> {FormatTimestamp(this.props.endTime)}
                </p>
            </div>
        );
    }
}

export default TimeDisplayer;