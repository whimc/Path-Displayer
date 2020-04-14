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
        this.handleSessionChange = this.handleSessionChange.bind(this);

        this.state = {
            loading: false,
            session: null,
            images: null, //[] array of objects usually

            generatedSession: null,
        }
    }

    handleSessionChange(value) {
        this.setState({ session: value });
    }

    generateButtonClick() {
        this.setState({
            loading: true,
            images: null,
            generatedSession: this.state.session,
        }, () => {
            helpers.QueryPathGenerator(
                this.state.session.username,
                this.state.session.start_time,
                this.state.session.end_time,
                images => {
                    this.setState({
                        images: images,
                        loading: false,
                    })
                }
            )
        });
    }

    render() {
        // Only render a spinner if we're in a loading state
        var spinner = (null)
        if (this.state.loading) {
            spinner = (
                <div>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                    <p>This may take a moment.</p>
                </div>
            )
        }

        // Render all the images or null if none exist
        var images = (null)
        if (this.state.images !== null) {
            if (this.state.images.length === 0) {
                images = (
                    <div className="Path-displayer">
                        <Alert variant="danger">
                            {this.state.generatedSession.username} did not explore any maps during this session!
                        </Alert>
                    </div>
                )
            } else {
                images = this.state.images.map((item, ind) => (
                    <PathImage 
                        key={item.link}
                        link={item.link}
                        title={item.title}
                    />
                ));
                images = (
                    <div>
                        <div className="Path-displayer">
                            <Alert variant="success">
                                {this.state.generatedSession.username} explored {this.state.images.length} map(s)!
                            </Alert>
                        </div>
                        <div className="Path-images">
                            {images}
                        </div>
                    </div>
                )
            }
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
                        disabled={this.state.session === null || this.state.loading}
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