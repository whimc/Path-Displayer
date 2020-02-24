import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

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
          <Alert variant="primary" className="mx-2">
            <Alert.Heading>Welcome to the WHIMC Path Generator!</Alert.Heading>
            <hr/>
            <WHIMCInput/>
            <Button variant="primary" disabled>Generate Images</Button>
          </Alert>
        </div>
      </header>
    </div>
  );
}

export default App;
