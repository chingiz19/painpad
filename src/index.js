import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './Header';
import EntrepreneurComp from './EntrepreneurComp';
import OurProblem from './OurProblem';

ReactDOM.render(
  <React.StrictMode>
    <Header/>
    <EntrepreneurComp/>
    <OurProblem/>
  </React.StrictMode>,
  document.getElementById('root')
);