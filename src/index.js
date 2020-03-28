import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './Header';
import EntrepreneurComp from './EntrepreneurComp';
import OurProblem from './OurProblem';
import PeoplesChallange from './PeoplesChallange';


ReactDOM.render(
  <React.StrictMode>
    <Header/>
    <EntrepreneurComp/>
    <OurProblem/>
    <PeoplesChallange/>
  </React.StrictMode>,
  document.getElementById('root')
);