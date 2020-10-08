/**
 * This file defines the redux store. A store can be seen as 
 * the state container of the entire application. To change any state of
 * the application we need to 'dispatch' an 'action on it
 * The state in redux is a variable that persists in memory
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';  // this brings in index.js from the 'reducers' folder, having access to 'combineReducers'

const initialState = {}; // by default the initial state is an empty object

const middleware = [thunk]; //

const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware),
    // settings in order to use redux devtools (devtools needs to be installed in the browser)
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
));

export default store;