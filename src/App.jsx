import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import PathDisplayer from './components/PathDisplayer';
import GithubFooter from './components/GithubFooter';

function App() {

  return (
    <div className="App">
      <PathDisplayer/>
      <GithubFooter />
    </div>
  );
}

export default App;
