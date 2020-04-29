import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Home from './Pages/home/Home';
import About from './Pages/about/About';
import Profile from './Pages/profile/Profile';
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
  credentials: 'include'
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/about" render={(props) => <About {...props} pageName="about" />}/>
          <Route path="/topics/:topic" render={(props) => <Topic {...props} pageName="topic" />}/>
          <Route path="/users/:userId" render={(props) => <Profile {...props} pageName="profile" />}/>
          <Route exact path="/" render={(props) => <Home {...props} pageName="home" />}/>
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