/**
 * This file defines the component 'CreateDevice'
 * Connects it to the redux store and to the reducer
 */
import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createDevice } from '../../actions/deviceActions';
import { setAlert } from '../../actions/alertActions';

const CreateDevice = ({ createDevice, history, setAlert }) => {
  const [formData, setFormData] = useState({ // add state to the component
    title: '',               // user input
    description: '',         // user input
    status: 'disconnected', // by default all devices created are set to 'disconnected'
    socketID: ''            // by default all devices created will have this field empty, until a connection is established
  });

  const { title, description} = formData;  // the form will have the empty fields 'title' and 'input'

  // called whenever user inputs data in fields
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });  // formdata is copied, and fields will be ready to get data
  
  // called when 'Create' button is pressed
  const onSubmit = (e) => {
    e.preventDefault();
    createDevice(formData, history); // calls action to createDevice, and a device is saved to database
    setAlert('Device added to database!', 'success'); // defines 'alert' message and type to be displayed
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Create Device</h1>
      <p className="lead">
        <i className="fas fa-tasks"></i> Add a new device to the database
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
        <input
            type="text"
            placeholder="* Device Title"
            name="title"
            required
            value={title}
            onChange={(e) => onChange(e)}
        />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Device Description"
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary" value="Create" /> 
        <Link className="btn btn-light my-1" to="/devices">
            Go Back
        </Link>
      </form>
    </Fragment>
  );
};

//propTypes is used to enforce the data type
//raises a warning if types passed are not the ones expected  
CreateDevice.propTypes = {
  createDevice: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { createDevice, setAlert })(withRouter(CreateDevice));
