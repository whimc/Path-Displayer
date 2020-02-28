import React from 'react';

import Button from 'react-bootstrap/Button'

import CustomInput from './CustomInput';
import TimeDisplayer from './TimeDisplayer';

class WHIMCInput extends React.Component {

    constructor(props) {
        super(props);
        
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);

        this.state = {
            username: '',
            start_time: '',
            end_time: ''
        };
    }

    handleUsernameChange(e) {
        this.setState({ username: e.target.value });
    }

    handleStartTimeChange(e) {
        this.setState({ start_time: e.target.value });
    }

    handleEndTimeChange(e) {
        this.setState({ end_time: e.target.value })
    }

    render() {
        return (
            <div>
                <TimeDisplayer
                    input={this.state}
                />
                <CustomInput
                    symbol="@"
                    text="Username"
                    onChange={this.handleUsernameChange}
                    className="pb-2"
                />
                <CustomInput
                    symbol="#"
                    text="Start time (Unix-based)"
                    onChange={this.handleStartTimeChange}
                    className="pb-2"
                />
                <CustomInput
                    symbol="#"
                    text="End time (Unix-based)"
                    onChange={this.handleEndTimeChange}
                    className="pb-2"
                />
                <Button variant="primary" disabled>Generate Images</Button>
            </div>
        )
    }
}

export default WHIMCInput;