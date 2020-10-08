/**
 * This file defines the device reducer. A reducer is a function that takes in a state
 * and an action (for this particular reducer, has to do with 'devices'). The action is 
 * going to be dispatched from the 'deviceActions' file
 */
import {
  GET_DEVICES,
  CREATE_DEVICE,
  DELETE_DEVICE,
  UPDATE_DEVICE,
  ASSIGN_TASK_TO_DEVICE,
  DEVICE_ERROR,
} from '../actions/types.js';

const initialState = {
  devices: [],  // this is the initial state by default
  loading: false,
};

/**
 * @param {Object} state  - refers to a single state value managed by the 'store'
 * @param {Object} action - must have a type and a payload
 *  Evaluate type with a switch statement.
 *  States are immutable, so we need to copy the current state (using the spread operator, ...),
 *  if there is one, and add our new state(payload)
 *  Throught the use of the application different states will take place
 *  depending on which action is selected to be dispatched. For 'devices' the application might need
 *  the following types:
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DEVICES:
      return {
        ...state,
        devices: action.payload.data,
        count: action.payload.count,
        loading: false,
      };
    
    case CREATE_DEVICE:
      return {
        ...state,
        devices: [action.payload, ...state.devices],
        loading: true
      };
    
      case UPDATE_DEVICE:
        return {
          ...state,
          devices: state.devices.map((device) => {
            if (device._id !== action.payload._id) { // this will make the form return with fields already filled, ready for update
              return action.payload;
            }
            return device;
          }),
      };
    
      case DELETE_DEVICE:
        return {
          ...state,
          devices: state.devices.filter(device => device._id !== action.payload) , // returns all devices except the one that is filtered
          loading: false,
      };
    
      case ASSIGN_TASK_TO_DEVICE:
        return {
          ...state,
          devices: state.devices.map((device) => {
            if (device._id !== action.payload._id) { // to assign a task to a device, the application needs to return the selected device
              return action.payload;
            }
            return device;
          }),
        };
    
    case DEVICE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    
    default:
      return state;
  }
}
