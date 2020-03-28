import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './Header';
import Tracker from './MixPanelTracker';

ReactDOM.render(
  <React.StrictMode>
    <Tracker />
    <Header />
  </React.StrictMode>,
  document.getElementById('root')
);