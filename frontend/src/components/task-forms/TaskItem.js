import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteTask } from '../../actions/taskActions';
import { setAlert } from '../../actions/alertActions';

const TaskItem = ({ deleteTask,
    task: {
        _id,
        title,
        description
  },
    setAlert
}) => {

    return (
        <div className="profile bg-light">
          <div>
                <h2>Title: {title} </h2>
                <p>Description: {description}</p>
          </div>
          <div>
                <Link to={`/update-task/${_id}`} className="btn btn-primary">
              Update
            </Link>
          </div>
          <div>
          <button onClick={(e) => {
              setAlert("Task deleted from database!", 'success');
              deleteTask(_id)
          }} type="button" className="btn btn-danger">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
    );
};

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { deleteTask, setAlert })(TaskItem);