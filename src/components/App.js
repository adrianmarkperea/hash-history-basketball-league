import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import Players from './Players';
import Teams from './Teams';
import Navbar from './Navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar />

        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/players'>
          <Players />
        </Route>
        <Route path='/teams'>
          <Teams />
        </Route>
      </div>
    </Router>
  );
}

export default App;
