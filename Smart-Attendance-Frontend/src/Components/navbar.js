/** @format */

import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Links from "./Links";

class Navbar extends Component {
  checkLogin = () => {
    if (localStorage.getItem("uid") === null) return <Redirect to='/login' />;
    else return <Redirect to='/' />;
  };
  render() {
    return (
      <nav className='nav-wrapper grey darken-3'>
        <div className='container'>
          <Link to='/' className='left ' style={{fontSize:"20px",fontFamily:"Verdana",}}>
            Smart Attendance
          </Link>
          <Links />
          {this.checkLogin()}
        </div>
      </nav>
    );
  }
}

export default Navbar;
