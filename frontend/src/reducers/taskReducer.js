/**
 * This file defines the task reducer. A reducer is a function that takes in a state
 * and an action (for this particular reducer, has to do with 'tasks'). The action is
 * going to be dispatched from the 'taskActions' file
 */
import {
  GET_TASKS,
  CREATE_TASK,
  DELETE_TASK,
  UPDATE_TASK,
  TASK_ERROR,
} from '../actions/types.js';

const initialState = {
  tasks: [], // this is the initial state by default
  loading: false,
};

/**
 * @param {Object} state  - refers to a single state value managed by the 'store'
 * @param {Object} action - must have a type and a payload
 *  Evaluate type with a switch statement.
 *  States are immutable, so we need to copy the current state (using the spread operator, ...),
 *  if there is one, and add our new state(payload)
 *  Throught the use of the application different states will take place
 *  depending on which action is selected to be dispatched. For 'tasks' the application might need
 *  the following types:
 */
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
          if (task._id !== action.payload._id) { // this will make the form return with fields already filled, ready for update
            return action.payload;
          }
          return task;
        }),
      };

    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload), // returns all tasks except the one that is filtered
        loading: false,
      };

    case TASK_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
