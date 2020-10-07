import { combineReducers } from 'redux';
import deviceReducer from './deviceReducer.js';
import taskReducer from './taskReducer.js';
import alertReducer from './alertReducer';

export default combineReducers({
  device: deviceReducer,
  task: taskReducer,
  alertReducer
});
