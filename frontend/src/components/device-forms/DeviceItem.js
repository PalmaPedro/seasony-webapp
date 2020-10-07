import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteDevice } from '../../actions/deviceActions';
import { setAlert } from '../../actions/alertActions';

const DeviceItem = ({
  deleteDevice,
  device: { _id, title, description, status, socketID },
  setAlert
}) => {
  return (
    <div className="profile bg-light">
      <div>
        <h4>Title: {title}</h4>
        <p>Description: {description}</p>
        <p>Status: {status}</p>
        <Link to={`/assign-task/${_id}`} className="btn btn-primary">
          Assign Task
        </Link>
      </div>
      <div>
        <Link to={`/update-device/${_id}`} className="btn btn-primary">
          Update
        </Link>
      </div>
      <div>
        <button
          onClick={(e) => {
            setAlert("Device deleted from database!", 'success');
            deleteDevice(_id);
          }}
          type="button"
          className="btn btn-danger"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

DeviceItem.propTypes = {
  device: PropTypes.object.isRequired,
  deleteDevice: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { deleteDevice, setAlert })(DeviceItem);
