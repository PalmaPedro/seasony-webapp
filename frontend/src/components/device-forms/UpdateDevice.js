/**
 * This file defines the component 'UpdateDevice'
 * Connects it to the redux store by calling the 'updateDevice' action and dispatching it to the reducer
 */
import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { updateDevice } from '../../actions/deviceActions';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertActions';

// define Component passing the following 'props'
const UpdateDevice = ({
  currentDevice, 
  updateDevice,
  setAlert,
  history,
}) => {
  const [formData, setFormData] = useState({ // add state to the component
    ...currentDevice,
  });

  // called whenever user inputs data in fields
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // called when 'Update' button is pressed
  const onSubmit = (e) => {
    e.preventDefault(); // 
    updateDevice(currentDevice._id, formData, history); // calls action and passes the id extracted from the current device
    setAlert('Device updated to database!', 'success'); // defines 'alert' message and type to be displayed
  };

  return (
    <Fragment>
      {currentDevice ? (
        <Fragment>
          <h1 className="large text-primary">Update Device</h1>
          <p className="lead">
            <i className="fas fa-tasks"></i> Update selected device
          </p>
          <small>* = required field</small>
          <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                type="text"
                placeholder="* Device Title"
                name="title"
                required
                value={formData.title}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group">
              <textarea
                name="description"
                cols="30"
                rows="5"
                placeholder="Device Description"
                value={formData.description}
                onChange={(e) => onChange(e)}
              ></textarea>
            </div>
            <input type="submit" className="btn btn-primary" value="Update" />
            <Link className="btn btn-light my-1" to="/devices">
              Go Back
            </Link>
          </form>
        </Fragment>
      ) : (
        <h3>Not found</h3>
      )}
    </Fragment>
  );
};

//propTypes is used to enforce the data type(this helps avoid bugs)
//raises a warning if types passed are not the ones expected  
UpdateDevice.propTypes = {
  updateDevice: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

// used to select part of the data from the redux store that the connected component needs.
const mapStateToProps = (state, ownProps) => {
  return {
    // Will have access to the :id from the path, when a user selects the device from the devicesList.
    // Filters all devices whose id's don't match and saves is as 'currentDevice'
    currentDevice: state.device.devices.filter((device) => {
      return device._id === ownProps.match.params.id;  
    })[0],                                             
  };
};

// when we use 'connect' to connect with the redux store we need to export it
export default connect(mapStateToProps, { updateDevice, setAlert })(withRouter(UpdateDevice));
