/**
 * This file defines the component which is the container of all
 * device items. It basically includes the 'create' button and it
 * is populated with all the device items. Loads all 'DeviceItem'
 */
import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DeviceItem from './DeviceItem';
import { getDevices } from '../../actions/deviceActions';
import PropTypes from 'prop-types';

// define Component passing the following 'props'
const DevicesList = ({ getDevices, device: { devices } }) => {
  useEffect(() => {
    getDevices();
  }, [getDevices]);

  return (
    <Fragment>
      <h2 className="large text-primary">Devices</h2>
      <p className="lead"> Browse list of available devices</p>
      <div>
        <Link to="/create-device" className="btn btn-primary">
          Create Device
        </Link>
      </div>
      <br></br>
      <div className="profiles">
            {devices.length > 0 ? (
              devices.map(device => (
                <DeviceItem key={device._id} device={device}/>
              ))
            ): <h4>No devices found... </h4>}
        </div>
    </Fragment>
  );
};

//propTypes is used to enforce the data type
//raises a warning if types passed are not the ones expected 
DevicesList.propTypes = {
  getDevices: PropTypes.func.isRequired,
  device: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  device: state.device
});

export default connect(mapStateToProps, { getDevices })(DevicesList);
