import axios from 'axios';
import {
  GET_DEVICES,
  CREATE_DEVICE,
  DELETE_DEVICE,
  UPDATE_DEVICE,
  ASSIGN_TASK_TO_DEVICE,
  DEVICE_ERROR,
  DEVICES_LOADING
} from './types.js';


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
    history.push('/devices');
  } catch (err) {
    dispatch({
      type: DEVICE_ERROR,
      payload: { msg: err }
    });
  }
};

export const updateDevice = (id, formData, history) => async dispatch => {
  try {
    const res = await axios.put(`/api/v1/devices/${id}`, formData);
  
    dispatch({
      type: UPDATE_DEVICE,
      payload: res.data
    });
    history.push('/devices');
  } catch (err) {
    dispatch({
      type: DEVICE_ERROR,
      payload: { msg: err }
    });
  };
}

export const deleteDevice = id => async dispatch => {
  try {
    await axios.delete(`/api/v1/devices/${id}`);
   
    dispatch({
      type: DELETE_DEVICE,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: DEVICE_ERROR,
      payload: { msg: err }
    });
  };
}

// assign task to device 
// todo: needs to pass the taskId aswell in order to bind it with
// the device
export const assignTaskToDevice = (id, formData, history) => async dispatch => {
  try {
    const res = await axios.put(`/api/v1/devices/run/${id}`, formData);
   
    dispatch({
      type: ASSIGN_TASK_TO_DEVICE,
      payload: res.data
    });
    history.push('/devices');
  } catch (err) {
    dispatch({
      type: DEVICE_ERROR,
      payload: { msg: err }
    });
  };
}


export const setDevicesLoading = () => {
  return {
    type: DEVICES_LOADING,
  };
};
