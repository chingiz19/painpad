import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './Header';
import EntrepreneurComp from './EntrepreneurComp';
import OurProblem from './OurProblem';
import PeoplesChallange from './PeoplesChallange';
import OurSolution from './OurSolution';
import Tracker from './MixPanelTracker';

ReactDOM.render(
  <React.StrictMode>
    <Tracker />
    <Header />
    <EntrepreneurComp />
    <OurProblem />
    <PeoplesChallange />
    <OurSolution />
  </React.StrictMode>,
  document.getElementById('root')
);