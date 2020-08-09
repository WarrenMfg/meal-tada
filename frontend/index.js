import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import App from './components/App';

render(
  <Router>
    <ScrollToTop />
    <App />
  </Router>,
  document.getElementById('root')
);
