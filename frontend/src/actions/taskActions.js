import axios from 'axios';
import {
  GET_TASKS,
  CREATE_TASK,
  DELETE_TASK,
  UPDATE_TASK,
  TASK_ERROR,
  TASKS_LOADING,
  //GET_TASKS_FOR_DEVICE,
} from './types';

// todo: refactor code to async/await syntax

// getTasks
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
//createTask
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
    history.push('/tasks');
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err },
    });
  }
};
// update Task
export const updateTask = (id, formData, history) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/v1/tasks/${id}`, formData);

    dispatch({
      type: UPDATE_TASK,
      payload: res.data,
    });
    history.push('/tasks');
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err },
    });
  }
};

// delete Task
export const deleteTask = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/tasks/${id}`);

    dispatch({
      type: DELETE_TASK,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err },
    });
  }
};

export const setDevicesLoading = () => {
  return {
    type: TASKS_LOADING,
  };
};
