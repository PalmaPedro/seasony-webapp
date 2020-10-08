/**
 * Main entry point for the React application. 
 * It loads some components here like the Navbar and Dashboard
 * (dashboard is intended to work as a 'landing-page' but not implemented yet...)
 * and re-routes to a 'Routes' component, which loads all the rest of the application components.
 * It connects here, redux, which is the state manager with react.
 * And also it loads styling used in the application
 */
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import Routes from './components/routing/Routes';

// Redux
import { Provider } from 'react-redux'; // Provider connects react with redux and it needs to wrap  all components
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <Fragment>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Dashboard} /> 
            <Route component={Routes} />
          </Switch>
        </Router>
      </Provider>
    </Fragment>
  );
};

export default App;
