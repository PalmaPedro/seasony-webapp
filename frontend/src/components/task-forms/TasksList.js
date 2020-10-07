import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TaskItem from './TaskItem';
import { getTasks } from '../../actions/taskActions';
//import PropTypes from 'prop-types';

const TasksList = ({ getTasks, task: { tasks } }) => {
  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <Fragment>
      <h1 className="large text-primary">Tasks</h1>
      <p className="lead"> Browse list of available tasks</p>
      <div>
        <Link to="/create-task" className="btn btn-primary">
          Create Task
        </Link>
      </div>
      <br></br>
      <div className="profiles">
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskItem key={task._id} task={task} />)
        ) : (
          <h4>No tasks found... </h4>
        )}
      </div>
    </Fragment>
  );
};

/*
TasksList.propTypes = {
   getTasks: PropTypes.func.isRequired,
   task: PropTypes.object.isRequired,
};*/

const mapStateToProps = (state) => {
  console.log(state);
  return {
    task: state.task,
  };
};

export default connect(mapStateToProps, { getTasks })(TasksList);
