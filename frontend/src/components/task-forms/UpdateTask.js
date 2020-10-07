import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { updateTask } from '../../actions/taskActions';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertActions';

const UpdateTask = ({ currentTask, updateTask, setAlert, history }) => {
  // I made it so the form contains the current data by default
  const [formData, setFormData] = useState({
    ...currentTask,
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    updateTask(currentTask._id, formData, history);
    setAlert('Task updated to database!', 'success');
  };

  return (
    <Fragment>
      {currentTask ? (
        <Fragment>
          <h1 className="large text-primary">Update Task</h1>
          <p className="lead">
            <i className="fas fa-tasks"></i> Update selected task
          </p>
          <small>* = required field</small>
          <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                type="text"
                placeholder="* Task Title"
                name="title"
                required
                value={formData.title}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group">
              <textarea
                name="description"
                cols="30"
                rows="5"
                placeholder="Task Description"
                value={formData.description}
                onChange={(e) => onChange(e)}
              ></textarea>
            </div>
            <input type="submit" className="btn btn-primary" value="Update" />
            <Link className="btn btn-light my-1" to="/tasks">
              Go Back
            </Link>
          </form>
        </Fragment>
      ) : (
        <h3>Not found</h3>
      )}
    </Fragment>
  );
};

UpdateTask.propTypes = {
  updateTask: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentTask: state.task.tasks.filter((task) => {
      return task._id === ownProps.match.params.id;
    })[0],
  };
};

export default connect(mapStateToProps, { updateTask, setAlert })(
  withRouter(UpdateTask)
);
