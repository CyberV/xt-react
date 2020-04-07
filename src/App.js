import React from 'react';
import logo from './logo.svg';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';

import CharacterCard from './components/characterCard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="main-body container">
        <div className="row avlbl-filters">
          <div className="col-xs-12 col-md-3"> Available Filters</div>
          <div className="col-xs-12 col-md-9">
            <div className="row">
              <div className="col-sm-12 slctd-filters">Selected Filters</div>
              <div className="col-sm-12 char-list">Char List
                <CharacterCard></CharacterCard>
              </div>

            </div>
          </div>
        </div>
      </div>
      </header>

    </div>
  );
}

export default App;
