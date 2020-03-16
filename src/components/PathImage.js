import React from 'react';

import Alert from 'react-bootstrap/Alert';
import { GetWorldFromImageName } from '../helpers';

class PathImage extends React.Component {
    render() {
        var worldName = GetWorldFromImageName(this.props.title)
        return (
            <Alert variant="primary">
                <Alert.Heading>{worldName}</Alert.Heading>
                <a
                    href={this.props.link}
                    target="_blank"
                    rel="noopener noreferrer">
                    
                    <img
                        width='100%'
                        src={this.props.link}
                        alt={this.props.title}>
                    </img>
                </a>
            </Alert>
        )
    }
}

export default PathImage;