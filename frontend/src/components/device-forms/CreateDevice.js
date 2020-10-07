import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createDevice } from '../../actions/deviceActions';
import { setAlert } from '../../actions/alertActions';

const CreateDevice = ({ createDevice, history, setAlert }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'disconnected',
    socketID: ''
  });

  const { title, description} = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const onSubmit = (e) => {
    e.preventDefault();
    createDevice(formData, history);
    setAlert('Device added to database!', 'success');
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

CreateDevice.propTypes = {
  createDevice: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { createDevice, setAlert })(withRouter(CreateDevice));
