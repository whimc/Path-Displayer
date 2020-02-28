import React from 'react';

import Alert from 'react-bootstrap/Alert'

import WHIMCInput from './WHIMCInput';

class PathDisplayer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Alert variant="primary" className="mx-2">
                <Alert.Heading>Welcome to the WHIMC Path Generator!</Alert.Heading>
                <hr />
                <WHIMCInput />
                {/* TODO: Render loading icon / images */}
            </Alert>
        )
    }
    
}

export default PathDisplayer;