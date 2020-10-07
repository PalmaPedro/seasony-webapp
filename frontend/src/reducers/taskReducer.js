//import { v4 as uuidv4 } from 'uuid';
import {
  GET_TASKS,
  CREATE_TASK,
  DELETE_TASK,
  UPDATE_TASK,
  TASK_ERROR,
  //TASKS_LOADING,
} from '../actions/types.js';

const initialState = {
  tasks: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload.data,
        count: action.payload.count,
        loading: false,
      };

    case CREATE_TASK:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
        loading: true,
      };

    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task._id !== action.payload._id) {
            return action.payload;
          }
          return task;
        }),
      };

    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
        loading: false,
      };

    

    case TASK_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    /*
    case TASKS_LOADING:
      return {
        ...state,
        loading: true,
      };*/

    default:
      return state;
  }
}
