import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Home from './Pages/home/Home';
import About from './Pages/about/About';
import Profile from './Pages/profile/Profile';
import myProfile from './Pages/myProfile/MyProfile';
import Topic from './Pages/topic/Topic';
import NotFound from './Pages/404/404';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const client = new ApolloClient({
  uri: 'https://api.painpad.co/graphql',
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/about" component={About} />
          <Route path="/topics/:topic" component={Topic} />
          <Route path="/users/:userId" component={Profile} />
          <Route path="/myprofile" component={myProfile} />
          <Route exact path="/" component={Home} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

ReactDOM.render(
  <App></App>,
  document.getElementById('root')
);