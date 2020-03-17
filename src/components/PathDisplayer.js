import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

import SessionSelect from './SessionSelect';
import PathImage from './PathImage';
import * as helpers from '../helpers';

class PathDisplayer extends React.Component {

    constructor(props) {
        super(props);
        
        this.generateButtonClick = this.generateButtonClick.bind(this);

        this.state = {
            loading: false,
            session: {},
            username: '',
            start_time: '',
            end_time: '',
            images: [],
        }
    }

    handleSessionChange(value) {
        this.setState({ session: value });
    }

    generateButtonClick() {
        this.setState({
            loading: true,
            images: [],
        }, () => {
            var query = helpers.GetPathGeneratorQuery(
                this.state.username, this.state.start_time, this.state.end_time
            )
            console.log(query)
        });
    }

    render() {
        // Only render a spinner if we're in a loading state
        var spinner = (null)
        if (this.state.loading) {
            spinner = (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            )
        }

        // Render all the images or null if none exist
        var images = (null)
        if (this.state.images.length !== 0) {
            images = this.state.images.map((item, ind) => (
                <PathImage 
                    link={item.link}
                    title={item.title}
                />
            ));
            images = <div className="Path-images">{images}</div>
        }

        return (
            <div id="parent">
            <div className="Path-displayer" id="input">
                <Alert variant="primary">
                    <Alert.Heading>Welcome to the WHIMC Path Generator!</Alert.Heading>
                    <hr />
                    <SessionSelect
                        sessionChange={this.handleSessionChange}
                    />
                    <hr />
                    <Button 
                        variant="primary"
                        onClick={this.generateButtonClick}>
                        Generate Images
                    </Button>
                </Alert>
                {spinner}
            </div>
            {images}
            </div>
        )
    }
    
}

export default PathDisplayer;