/**
 * This file defines the actions to be dispatched whenever a component calls it.
 * An action is a plain object that represents the intention to change state.
 * The paths used here with axios are prepended by the proxy set in the package.json file (which is localhost running at port:5000)
 */
import axios from 'axios'; // library used to send HTTP requests to the server
import {
  GET_DEVICES,
  CREATE_DEVICE,
  DELETE_DEVICE,
  UPDATE_DEVICE,
  ASSIGN_TASK_TO_DEVICE,
  DEVICE_ERROR,
  DEVICES_LOADING
} from './types.js';

/**
 * Makes a GET request to the server and fetches all devices
 * Dispatches type and payload when action gets called
 * If it fails, 'catch' block will give error
 */
export const getDevices = () => async dispatch => {
 try {
   const res = await axios.get('api/v1/devices');
   dispatch({
     type: GET_DEVICES,
     payload: res.data 
   });
 } catch (err) {
   dispatch({
     type: DEVICE_ERROR,
     payload: { msg: err }
   });
 }
};

/**
 * Makes a POST request to the server, sending user input data to be saved in database
 * Dispatches type and payload when action gets called
 * @param {Object} formData passes user input including 'title' and 'description'
 * @param {Object} history  object belonging to a package included in react-router dependency 
 */
export const createDevice = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
       'Content-Type': 'application/json'
     }
   }
    const res = await axios.post('api/v1/devices', formData, config);
    dispatch({
      type: CREATE_DEVICE,
      payload: res.data
    });
    history.push('/devices'); // re-directs user to tasks list page
  } catch (err) {
    dispatch({
      type: DEVICE_ERROR,
      payload: { msg: err }
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
export const updateDevice = (id, formData, history) => async dispatch => {
  try {
    const res = await axios.put(`/api/v1/devices/${id}`, formData);
  
    dispatch({
      type: UPDATE_DEVICE,
      payload: res.data
    });
    history.push('/devices'); // re-directs user to tasks list page
  } catch (err) {
    dispatch({
      type: DEVICE_ERROR,
      payload: { msg: err }
    });
  };
}

/**
 * Makes a DELETE request to the server, deleting it from database
 * Dispatches type and payload when action gets called
 * @param {String} id  identifies a specific device
 */
export const deleteDevice = id => async dispatch => {
  try {
    await axios.delete(`/api/v1/devices/${id}`);
   
    dispatch({
      type: DELETE_DEVICE,
      payload: id // only id is needed 
    });
  } catch (err) {
    dispatch({
      type: DEVICE_ERROR,
      payload: { msg: err }
    });
  };
}

/**
 * Makes a PUT request to the server, updating a device in database. The update will add a task to be run by the device
 * Dispatches type and payload when action gets called
 * @param {String} id identifies a specfic device
 * @param {Object} formData passes user input including 'title' and 'description' plus a 'taskId' 
 * @param {Object} history  object belonging to a package included in react-router dependency 
 * that uses .push() method to re-direct user through a specific path after form submission
 */
export const assignTaskToDevice = (id, formData, history) => async dispatch => {
  try {
    const res = await axios.put(`/api/v1/devices/run/${id}`, formData); // passes user input for this device  which includes the selected task
   
    dispatch({
      type: ASSIGN_TASK_TO_DEVICE,
      payload: res.data
    });
    history.push('/devices'); // re-directs user to tasks list page
  } catch (err) {
    dispatch({
      type: DEVICE_ERROR,
      payload: { msg: err }
    });
  };
}

/**
 * 
 */
export const setDevicesLoading = () => {
  return {
    type: DEVICES_LOADING,
  };
};
