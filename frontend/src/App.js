import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import Routes from './components/routing/Routes';

// Redux
import { Provider } from 'react-redux';
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

/*
      class App extends Component {
        render() {
          return (
            <Provider store={store}>
              <div className="App">
                <AppNavbar />
                <Container>
                  <DeviceModal />
                  <DevicesList />
                </Container>
              </div>
            </Provider>
          );
        }
      }
      */

export default App;
