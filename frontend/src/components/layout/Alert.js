/**
 * This files defines the 'Alert' component and connects it to the redux store. 
 * A component is a function that accepts a single'props' (properties) object argument
 * with data and returns a React element
 */
import React from 'react';
import PropTypes from 'prop-types'; // library that checks the data types passed in 'props' object.  
import { connect } from 'react-redux';  // 'connect' function connects a react component to the redux store

/**
 * Defines the component, passing the 'props' as the 'alerts' array.
 * A check is made to see if there are elements in the array, which is then looped
 * through, displaying the alert matching the id.
 */ 
const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alertReducer) => (
    <div key={alertReducer.id} className={`alert alert-${alertReducer.alertType}`}>
      {alertReducer.msg} 
    </div>
  ));

//propTypes is used to enforce the data type(this helps avoid bugs)
//raises a warning if types passed are not the ones expected  
Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

// it is used to select part of the data from the redux store that the connected component needs.
const mapStateToProps = (state) => ({
  alerts: state.alertReducer,
});

// when we use 'connect' to connect with the redux store we need to export it
export default connect(mapStateToProps)(Alert);
