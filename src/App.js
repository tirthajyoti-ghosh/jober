import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Sidenav from './components/Sidenav';
import JobListings from './pages/JobListings';
import './styles/main.sass';

const App = () => (
  <Router>
    <main>
      <Sidenav />
      <Route exact path="/jobs" component={JobListings} />
    </main>
  </Router>
);

export default App;
