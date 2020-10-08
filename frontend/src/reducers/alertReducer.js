/**
 * This file defines the alert reducer. A reducer is a function that takes in a state
 * and an action (for this particular reducer, has to do with 'alerts'). The action is 
 * going to be dispatched from the 'alertActions' file
 */
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = []; // this is the initial state by default

/**
 * @param {Object} state  - refers to a single state value managed by the 'store'
 * @param {Object} action - must have a type and a payload
 *  Evaluate type with a switch statement.
 *  States are immutable, so we need to copy the current state (using the spread operator, ...),
 *  if there is one, and add our new state(payload)
 */
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alertReducer) => alertReducer.id !== payload);
    default:
      return state;
  }
}
