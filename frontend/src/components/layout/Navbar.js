import React from 'react';
import { Link } from 'react-router-dom';
//import PropTypes from 'prop-types';

const Navbar = props => {
  return (
    <section>
    <nav className="navbar">
      <h1>
        <Link to="#"> </Link>
      </h1>
      <ul>
        <Link to="/login"><i className="fas fa-sign-out-alt"></i>Logout</Link>
      </ul>
      </nav>
      <div className="sidenav">
      <h1>
        <Link to="#"> Seasony</Link>
      </h1>
      <Link to="/dashboard"><i className="fas fa-tachometer-alt fa-fw"></i> Dashboard</Link>
      <Link to="/devices"><i className="fas fa-robot fa-fw"></i>Devices</Link>
      <Link to="/tasks"> <i className="fas fa-tasks fa-fw"></i>Tasks</Link>
      <Link to="#"><i className="fas fa-user fa-fw"></i>Account</Link>
    </div>
      </section>
  );
};

Navbar.propTypes = {};

export default Navbar;
