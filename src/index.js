// STUFF FROM REACT & REACT-DOM
import React from 'react';
import ReactDOM from 'react-dom';

// APP COMPONENT
import App from './App';

// GLOBAL CSS
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

