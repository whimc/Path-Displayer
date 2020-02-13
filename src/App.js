import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

import WHIMCInput from './components/WHIMCInput'

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
          
          <WHIMCInput symbol="@" text="Username" className="pb-2"/>
          <WHIMCInput symbol="#" text="Start time (Unix-based)" className="pb-2"/>
          <WHIMCInput symbol="#" text="End time (Unix-based)" className="pb-2"/>
          <Button variant="primary">Generate Images</Button>
          </Alert>
        </div>
      </header>
    </div>
  );
}

export default App;
