/** @format */

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Links = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const isLoggedIn = () => {
    if (localStorage.getItem("uid") !== null) {
      return setLoggedIn(true);
    }
    return setLoggedIn(false);
  };

  const logout = () => {
    localStorage.removeItem("uid");
  };

  useEffect(() => {
    isLoggedIn();
  }, [loggedIn]);

  return (
    loggedIn && (
      <>
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
            <NavLink to='/login' onClick={logout}>
              Log Out
            </NavLink>
          </li>
        </ul>
      </>
    )
  );
};

export default Links;
