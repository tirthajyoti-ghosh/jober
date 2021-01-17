/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { NavLink } from 'react-router-dom';

import PropTypes from 'prop-types';

const SideNav = () => (
  <div className="sidenav">
    <a href="/" className="logo"><img src="https://user-images.githubusercontent.com/57726348/95655344-3ae8de00-0b24-11eb-9c34-1fac11fecfcc.png" alt="logo" /></a>

    <section className="nav-items">
      <a href="#">Home</a>
      <NavLink exact to="/jobs" activeClassName="active">Search Job</NavLink>
      <NavLink exact to="/talents" activeClassName="active">Find Talent</NavLink>
      <a href="#">Community</a>
      <a href="#">More</a>
    </section>

    <a href="#" style={{ marginBottom: '50%' }}>Login</a>
  </div>
);

export default SideNav;
