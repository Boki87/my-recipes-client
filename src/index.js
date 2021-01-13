import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom'
import CombinedContext from './context'

ReactDOM.render(
  <React.StrictMode>
    <CombinedContext>
      <Router>
        <App />
      </Router>
    </CombinedContext>
  </React.StrictMode>,
  document.getElementById('root')
);