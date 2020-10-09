/**
 * This file defines the component 'CreateTask'
 * Connects it to the redux store and to the reducer
 */
import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createTask } from '../../actions/taskActions';
import { setAlert } from '../../actions/alertActions';

// define Component passing the following 'props'
const CreateTask = ({ createTask, setAlert, history }) => {
  const [formData, setFormData] = useState({
    title: '',   // for user input
    description: '' // for user input
  });

  const { title, description } = formData;  // the form will have the empty fields 'title' and 'input'

  // called whenever user inputs data in fields
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  
   // called when 'Create' button is pressed
  const onSubmit = (e) => {
    e.preventDefault();
    createTask(formData, history); // calls action to createTask, and a device is saved to database
    setAlert('Task added to database!', 'success');  // defines 'alert' message and type to be displayed
  }

    return (
        <Fragment>
            <h1 className="large text-primary">Create Task</h1>
      <p className="lead">
        <i className="fas fa-tasks"></i> Add a new task to the database
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Task Title"
            name="title"
            required
            value={title}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Task Description"
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary" value="Create" /> 
        <Link className="btn btn-light my-1" to="/tasks">Go Back</Link>
      </form>
        </Fragment>
    )
}
//propTypes is used to enforce the data type
//raises a warning if types passed are not the ones expected 
CreateTask.propTypes = {
  createTask: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
}

export default connect(null, { createTask, setAlert })(withRouter(CreateTask));
