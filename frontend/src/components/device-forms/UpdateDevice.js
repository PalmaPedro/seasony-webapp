import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { updateDevice } from '../../actions/deviceActions';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertActions';

const UpdateDevice = ({
  // i added this prop to be able to access the :id part of the route
  //match: { params },
  // this prop contains the data for device that has this id
  currentDevice,
  updateDevice,
  setAlert,
  history,
}) => {
  // I made it so the form contains the current data by default
  const [formData, setFormData] = useState({
    ...currentDevice,
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    updateDevice(currentDevice._id, formData, history);
    setAlert('Device updated to database!', 'success');
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
                // This variable needs to match the form variable ( read more about react controlled input)
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
                // This variable needs to match the form variable ( read more about react controlled input)
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

UpdateDevice.propTypes = {
  updateDevice: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

// I added the "ownProps" parameter to this function, to have access to the parameters of the Componenent
// This was done to be able to access the :id from the path, by using the variable match.params.id
// Then i filter all the devices to return the device that matches the parameter as currentDevice
const mapStateToProps = (state, ownProps) => {
  return {
    currentDevice: state.device.devices.filter((device) => {
      return device._id === ownProps.match.params.id;
    })[0],
  };
};

export default connect(mapStateToProps, { updateDevice, setAlert })(
  withRouter(UpdateDevice)
);
