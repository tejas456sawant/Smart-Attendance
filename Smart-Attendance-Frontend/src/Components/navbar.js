/** @format */

import React from "react";
import { Link, NavLink } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";

const Navbar = () => {
  return (
    <nav className='nav-wrapper grey darken-3'>
      <div className='container'>
        <Link
          to='/'
          className='left '
          style={{ fontSize: "20px", fontFamily: "Verdana" }}>
          Smart Attendance
        </Link>
        <ul className='right'>
          <li>
            <NavLink to='/New'>New</NavLink>
          </li>
          <li>
            <NavLink to='/timetable'>Time Table</NavLink>
          </li>
          <li>
            <NavLink to='/StudentInfo'>Records</NavLink>
          </li>
          <li>
            <NavLink to='/complaint'>Complaints</NavLink>
          </li>
          <li>
            <NavLink to='/generate'>Report</NavLink>
          </li>
          <li>
            <NavLink
              to='/login'
              onClick={() => {
                firebase.auth().signOut();
              }}>
              Log Out
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
