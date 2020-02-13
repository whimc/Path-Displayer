import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Alert from 'react-bootstrap/Alert'

function App() {
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />
      <header className="App-header">
        <div>
          <Alert variant="primary">
            <Alert.Heading>Welcome to the WHIMC Path Generator!</Alert.Heading>
          
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              />
          </InputGroup>
          
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">#</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Start time (Unix-based)"
              aria-label="Start time (Unix-based)"
              aria-describedby="basic-addon1"
              />
          </InputGroup>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">#</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="End time (Unix-based)"
              aria-label="End time (Unix-based)"
              aria-describedby="basic-addon1"
              />
          </InputGroup>
          </Alert>
        </div>
      </header>
    </div>
  );
}

export default App;
