import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './Header';
import EntrepreneurComp from './EntrepreneurComp';
import OurProblem from './OurProblem';
import PeoplesChallange from './PeoplesChallange';
import OurSolution from './OurSolution';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tracker from './MixPanelTracker';

ReactDOM.render(
  <React.StrictMode>
    <Tracker info='Enterpreneur Advice' />
    <Header />
    <EntrepreneurComp />

    <Tracker info='Our Problem' />
    <OurProblem />

    <Tracker info='Peoples Challenge' />
    <PeoplesChallange />

    <Tracker info='Our Solution' />
    <OurSolution />

    <Tracker info='Subscribe' />
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);