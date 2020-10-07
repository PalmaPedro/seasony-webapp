//import { v4 as uuidv4 } from 'uuid';
import {
  GET_DEVICES,
  //GET_DEVICE,
  CREATE_DEVICE,
  DELETE_DEVICE,
  UPDATE_DEVICE,
  ASSIGN_TASK_TO_DEVICE,
  DEVICE_ERROR,
} from '../actions/types.js';

const initialState = {
  devices: [],
  loading: false,
};

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
            if (device._id !== action.payload._id) {
              return action.payload;
            }
            return device;
          }),
      };
    
      case DELETE_DEVICE:
        return {
          ...state,
          devices: state.devices.filter(device => device._id !== action.payload) ,// returns all posts except the one that is filtered
          loading: false,
      };
    
      case ASSIGN_TASK_TO_DEVICE:
        return {
          ...state,
          devices: state.devices.map((device) => {
            if (device._id !== action.payload._id) {
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
