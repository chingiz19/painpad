import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './Header';
import EntrepreneurComp from './EntrepreneurComp';

ReactDOM.render(
  <React.StrictMode>
    <Header/>
    <EntrepreneurComp/>
  </React.StrictMode>,
  document.getElementById('root')
);