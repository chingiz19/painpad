import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Home from './Pages/home/Home';
import About from './Pages/about/About';
import Profile from './Pages/profile/Profile';
import Topic from './Pages/topic/topic';
import NotFound from './Pages/404/404';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/about" component={About} />
        <Route path="/topics/:topic" component={Topic} />
        <Route path="/users/:userId" component={Profile} />
        <Route exact path="/" component={Home} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

ReactDOM.render(
  <App></App>,
  document.getElementById('root')
);