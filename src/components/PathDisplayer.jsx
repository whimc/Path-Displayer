import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

import SessionSelect from './SessionSelect';
import PathImage from './PathImage';
import { getConfigErrorMessage } from '../config';
import * as helpers from '../helpers';

class PathDisplayer extends React.Component {

  constructor(props) {
    super(props);

    this.generateButtonClick = this.generateButtonClick.bind(this);
    this.handleSessionChange = this.handleSessionChange.bind(this);
    this.handleFetchError = this.handleFetchError.bind(this);
    this.handleGenerateError = this.handleGenerateError.bind(this);

    const configError = getConfigErrorMessage();

    this.state = {
      loading: false,
      error: Boolean(configError),
      errorMessage: configError || '',
      session: null,
      images: null,
      generatedSession: null,
    };
  }

  handleSessionChange(value) {
    this.setState({ session: value, error: false, errorMessage: '' });
  }

  handleFetchError(error) {
    const detail = error?.message ? ` (${error.message})` : '';
    this.setState({
      error: true,
      errorMessage: `There was an error loading the list of players and sessions${detail}.`,
    });
  }

  handleGenerateError(error) {
    const detail = error?.message ? ` (${error.message})` : '';
    this.setState({
      error: true,
      errorMessage: `There was an error generating the path maps${detail}.`,
      loading: false,
    });
  }

  generateButtonClick() {
    this.setState({
      loading: true,
      images: null,
      error: false,
      errorMessage: '',
      generatedSession: this.state.session,
    }, () => {
      helpers.QueryPathGenerator(
        this.state.session.username,
        this.state.session.start_time,
        this.state.session.end_time,
        (images) => {
          this.setState({
            images,
            loading: false,
          });
        },
        this.handleGenerateError
      );
    });
  }

  render() {
    let spinner = null;
    if (this.state.loading) {
      spinner = (
        <div>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p>This may take a moment.</p>
        </div>
      );
    }

    let images = null;
    if (this.state.images !== null) {
      if (this.state.images.length === 0) {
        images = (
          <div className="Path-displayer">
            <Alert variant="warning">
              {this.state.generatedSession.username} did not explore any maps during this session.
            </Alert>
          </div>
        );
      } else {
        const imageElements = this.state.images.map((item) => (
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
              {imageElements}
            </div>
          </div>
        );
      }
    }

    return (
      <div id="parent">
        <div className="Path-displayer" id="input">
          {this.state.error &&
            <Alert variant="danger">
              {this.state.errorMessage}
            </Alert>
          }
          <Alert variant="primary">
            <Alert.Heading>Welcome to the WHIMC Path Displayer!</Alert.Heading>
            <hr />
            <SessionSelect
              sessionChange={this.handleSessionChange}
              onError={this.handleFetchError}
              disabled={Boolean(getConfigErrorMessage())}
            />
            <hr />
            <Button
              variant="primary"
              disabled={this.state.session === null || this.state.loading || Boolean(getConfigErrorMessage())}
              onClick={this.generateButtonClick}>
              Generate Images
            </Button>
          </Alert>
          {spinner}
        </div>
        {images}
      </div>
    );
  }

}

export default PathDisplayer;
