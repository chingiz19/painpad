import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Admin from './Pages/admin/Admin';
import Home from './Pages/home/Home';
import About from './Pages/about/About';
import Notifications from './Pages/notifications/Notifications';
import Profile from './Pages/profile/Profile';
import Topic from './Pages/topic/Topic';
import ResetPass from './Pages/resetPass/ResetPass';
import NotFound from './Pages/404/404';
import Post from './Pages/post/Post';
import Search from './Pages/search/Search';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from "apollo-client";
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  // uri: 'https://api.painpad.co/graphql',
  uri: 'http://localhost:8080/graphql',
  credentials: 'include'
});

const wsLink = new WebSocketLink({
  uri: `wss://api.painpad.co/subscriptions`,
  options: {
    reconnect: true
  }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  credentials: 'include',
  cache,
  link
});  

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/about" render={(props) => <About {...props} pageName="About" />} />
          <Route exact path="/notifications" render={(props) => <Notifications {...props} pageName="Notifications" />} />
          <Route exact path="/search" render={(props) => <Search {...props} pageName="Search" />} />
          <Route exact path="/admin" render={(props) => <Admin {...props} pageName="Admin" />} />
          <Route path="/topics/:topic" render={(props) => <Topic {...props} pageName="Topic" />} />
          <Route path="/users/:userId" render={(props) => <Profile {...props} pageName="Profile" />} />
          <Route path="/posts/:postId" render={(props) => <Post {...props} pageName="Post" />} />
          <Route path="/resetPass/:token" render={(props) => <ResetPass {...props} pageName="ResetPass" />} />
          <Route exact path="/" render={(props) => <Home {...props} pageName="Home" />} />
          <Route path="*" render={(props) => <NotFound {...props} pageName="404" />} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

ReactDOM.render(
  <App></App>,
  document.getElementById('root')
);