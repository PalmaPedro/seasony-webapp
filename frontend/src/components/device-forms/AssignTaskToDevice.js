import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { assignTaskToDevice } from '../../actions/deviceActions';
import { getTasks } from '../../actions/taskActions';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertActions';

const AssignTaskToDevice = ({
  getTasks,
  assignTaskToDevice,
  task: { tasks },
  history,
  currentDevice,
  setAlert
}) => {
  useEffect(() => {
    getTasks();
    console.log(currentDevice);
  }, [getTasks, currentDevice]);

  const [formData, setFormData] = useState({
    taskId: '',
    description: '',
  });

  const { taskId } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    assignTaskToDevice(currentDevice._id, formData, history);
    setAlert('Device assigned with a task!', 'success');
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Assign Task</h1>
      <p className="lead">
        <i className="fas fa-tasks"></i> Assign a task to your device
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <select name="taskId" value={taskId} onChange={(e) => onChange(e)}>
            <option value="0">* Select Available Tasks</option>
            {tasks.length > 0 ? (
              tasks.map((task) => {
                return (
                  <option key={task._id} value={task._id}>
                    {task.title}
                  </option>
                );
              })
            ) : (
              <option>No tasks found...</option>
            )}
          </select>
          <div className="form-group" />
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Task Description"
            //value={description}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary" value="Assign Task"/>
        <Link className="btn btn-light my-1" to="/devices">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AssignTaskToDevice.propTypes = {
  //getTasks: PropTypes.func.isRequired,
  assignTaskToDevice: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  //task: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    task: state.task,
    currentDevice: state.device.devices.filter((device) => {
      return device._id === ownProps.match.params.id;
    })[0],
  };
};

export default connect(mapStateToProps, { getTasks, assignTaskToDevice, setAlert })(
  withRouter(AssignTaskToDevice)
);
