import React from 'react';
//import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';

import './index.scss';
import 'macro-css';

import App from './App';

//const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

