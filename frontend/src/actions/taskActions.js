/**
 * This file defines the actions to be dispatched whenever the 'tasks' related components calls them.
 * An action is a plain object that represents the intention to change state
 * The paths used here with axios are prepended by the proxy set in the package.json file (which is localhost running at port:5000)
 */
import axios from 'axios'; // library used to send HTTP requests to the server
import {
  GET_TASKS,
  CREATE_TASK,
  DELETE_TASK,
  UPDATE_TASK,
  TASK_ERROR,
  TASKS_LOADING,
  //GET_TASKS_FOR_DEVICE,
} from './types';


/**
 * Makes a GET request to the server and fetches all tasks
 * Dispatches type and payload when action gets called
 * If it fails, 'catch' block will give error
 */
export const getTasks = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/tasks');
    //console.log(res.data);
    dispatch({
      type: GET_TASKS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err },
    });
  }
};

/**
 * Makes a POST request to the server, sending user input data to be saved in database
 * Dispatches type and payload when action gets called
 * @param {Object} formData passes user input including 'title' and 'description'
 * @param {Object} history  object belonging to a package included in react-router dependency 
 */
export const createTask = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/api/v1/tasks', formData, config);
    dispatch({
      type: CREATE_TASK,
      payload: res.data
    });
    history.push('/tasks'); // re-directs user to tasks list page
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err },
    });
  }
};

/**
 * Makes a PUT request to the server, sending data of a specific device to be updated in database
 * Dispatches type and payload when action gets called
 * @param {String} id identifies a specfic device
 * @param {Object} formData passes user input including 'title' and 'description'
 * @param {Object} history  object belonging to a package included in react-router dependency 
 * that uses .push() method to re-direct user through a specific path after form submission
 */
export const updateTask = (id, formData, history) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/v1/tasks/${id}`, formData);
    dispatch({
      type: UPDATE_TASK,
      payload: res.data,
    });
    history.push('/tasks');  // re-directs user to tasks list page
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err },
    });
  }
};

/**
 * Makes a DELETE request to the server, deleting it from database
 * Dispatches type and payload when action gets called
 * @param {String} id  identifies a specific device
 */
export const deleteTask = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/tasks/${id}`);
    dispatch({
      type: DELETE_TASK,
      payload: id, // only id is needed
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err },
    });
  }
};

/**
 * 
 */
export const setDevicesLoading = () => {
  return {
    type: TASKS_LOADING,
  };
};
