import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createTask } from '../../actions/taskActions';
import { setAlert } from '../../actions/alertActions';

const CreateTask = ({ createTask, setAlert, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const { title, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const onSubmit = (e) => {
    e.preventDefault();
    createTask(formData, history);
    setAlert('Task added to database!', 'success');
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

CreateTask.propTypes = {
  createTask: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
}

export default connect(null, { createTask, setAlert })(withRouter(CreateTask));
