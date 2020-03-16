import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import PathDisplayer from './components/PathDisplayer';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <PathDisplayer />
      </header>
    </div>
  );
}

export default App;
