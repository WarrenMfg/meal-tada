import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { GlobalStore } from './store/GlobalStore';
import App from './components/App';

render(
  <Router>
    <ScrollToTop />
    <GlobalStore>
      <App />
    </GlobalStore>
  </Router>,
  document.getElementById('root')
);
