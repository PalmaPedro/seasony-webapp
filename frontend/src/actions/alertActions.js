/**
 * This file defines the action to be dispatched whenever a component calls it.
 * An action is a plain object that represents the intention to change state
 */
import { v4 as uuidv4 } from 'uuid'; // generates a random id number to identify each alert
import { SET_ALERT, REMOVE_ALERT } from './types';

/**
 * @param {String} msg  passes a message to te displayed
 * @param {Object} alertType  defines which kind of alert to use (i.e success, danger etc...)
 * @param {*} timeout  it is set to be displayed for 5sec
 */
export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  // this function makes the alert disapear from the UI after the set duration of 5 sec.
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};