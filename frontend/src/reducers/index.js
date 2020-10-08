/**
 * This file holds an helper function that turns an
 * object whose values are different into a single reducing
 * function that is passed to createStore
 */
import { combineReducers } from 'redux';
import deviceReducer from './deviceReducer.js';
import taskReducer from './taskReducer.js';
import alertReducer from './alertReducer';

export default combineReducers({
  device: deviceReducer,
  task: taskReducer,
  alertReducer
});
