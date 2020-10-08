/**
 * This file combines all the components to be loaded from the App.js component
 *
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CreateDevice from '../device-forms/CreateDevice';
import DevicesList from '../device-forms/DevicesList';
import UpdateDevice from '../device-forms/UpdateDevice';
import AssignTaskToDevice from '../device-forms/AssignTaskToDevice';
import TasksList from '../task-forms/TasksList';
import CreateTask from '../task-forms/CreateTask';
import UpdateTask from '../task-forms/UpdateTask';
import Alert from '../../components/layout/Alert';


const Routes = (props) => {
  return (
    <section className="main">
      <Alert />
      <Switch>
        <Route exact path="/create-device" component={CreateDevice} />
        <Route exact path="/devices" component={DevicesList} />
        <Route exact path="/update-device/:id" component={UpdateDevice} />
        <Route exact path="/assign-task/:id" component={AssignTaskToDevice} />
        <Route exact path="/tasks" component={TasksList} />
        <Route exact path="/create-task" component={CreateTask} />
        <Route exact path="/update-task/:id" component={UpdateTask} />
      </Switch>
    </section>
  );
};

export default Routes;
