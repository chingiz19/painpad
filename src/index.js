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
          <Route exact path="/about" render={(props) => <About {...props} pageName="About" />}/>
          <Route exact path="/notifications" render={(props) => <Notifications {...props} pageName="Notifications" />}/>
          <Route exact path="/admin" render={(props) => <Admin {...props} pageName="Admin" />}/>
          <Route path="/topics/:topic" render={(props) => <Topic {...props} pageName="Topic" />}/>
          <Route path="/users/:userId" render={(props) => <Profile {...props} pageName="Profile" />}/>
          <Route path="/resetPass/:token" render={(props) => <ResetPass {...props} pageName="ResetPass" />}/>
          <Route exact path="/" render={(props) => <Home {...props} pageName="Home" />}/>
          <Route path="*" render={(props) => <NotFound {...props} pageName="404" />}/>
          {/* <Route path="*" component={NotFound} /> */}
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

ReactDOM.render(
  <App></App>,
  document.getElementById('root')
);