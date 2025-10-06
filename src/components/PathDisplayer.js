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
        this.handleFetchError = this.handleFetchError.bind(this);
        this.handleGenerateError = this.handleGenerateError.bind(this);

        this.state = {
            loading: false,
            error: false,
            errorMessage: "",
            session: null,
            images: null, //[] array of objects usually

            generatedSession: null,
        }
    }

    handleSessionChange(value) {
        this.setState({ session: value });
    }

    handleFetchError() {
        this.setState({
            error: true,
            errorMessage: "There was an error loading the list of players and sessions!",
        });
    }

    handleGenerateError() {
        this.setState({
            error: true,
            errorMessage: "There was an error generating the path maps!",
        })
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
                },
                this.handleGenerateError
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
                    {this.state.error &&
                        <Alert variant="danger">
                            <b>There was an error loading the player / session list!</b>
                            <b>{this.state.errorMessage}</b>
                        </Alert>
                    }
                    <Alert variant="primary">
                        <Alert.Heading>Welcome to the WHIMC Path Displayer!</Alert.Heading>
                        <hr />
                        <SessionSelect
                            sessionChange={this.handleSessionChange}
                            onError={this.handleFetchError}
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
