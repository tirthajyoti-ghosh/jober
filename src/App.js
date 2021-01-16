import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Sidenav from './components/Sidenav';
import './styles/main.sass';

const App = () => (
  <Router>
    <main>
      <Sidenav />
    </main>
  </Router>
);

export default App;
