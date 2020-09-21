/** @format */

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import SpinnerComp from "./SpinnerComp";
import firebase from "firebase/app";
import "firebase/auth";

class Login extends Component {
  state = {
    email: "",
    password: "",
    loadSpinner: false,
    errorText: "",
  };

  render() {
    return (
      <main
        style={{
          background: "linear-gradient(to bottom,#d5dae5, #e4e6ed, #f2f2f6",
        }}>
        <center>
          <div
            className=' row white'
            style={{
              borderRadius: "20px",
              margin: "30px",
              display: "inline-block",
              padding: "32px 48px 40px 58px",
              border: "1px solid #EEE",
              width: "35%",
            }}>
            <img
              className='responsive-img'
              style={{ width: "250px", margin: "0px" }}
              src='https://cdn.dribbble.com/users/1332896/screenshots/3195603/scan.gif'
              alt='...'
            />

            <h5
              className='teal-text'
              style={{
                fontFamily: "Lucida Console, Courier,  monospace",
                fontSize: "18px",
              }}>
              Admin Login
            </h5>

            <div className='col l12'>
              <div className='row'>
                <div className='col l12'></div>
              </div>

              <div className='row'>
                <div className='input-field col s12'>
                  <input
                    className='validate'
                    type='email'
                    name='email'
                    id='email'
                    onChange={(text) => {
                      this.setState({ email: text.target.value });
                    }}
                  />
                  <label htmlFor='email'>Enter your email</label>
                </div>
              </div>

              <div className='row'>
                <div className='input-field col s12 '>
                  <input
                    className='validate'
                    type='password'
                    name='password'
                    id='password'
                    onChange={(text) => {
                      this.setState({ password: text.target.value });
                    }}
                  />
                  <label htmlFor='password'>Enter your password</label>
                </div>
              </div>

              <br />
              <center>
                <div className='row'>
                  <button
                    type='submit'
                    name='btn_login'
                    className='col s12 btn btn-large waves-effect teal center'
                    style={{
                      width: "50%",
                      marginLeft: "25%",
                      borderRadius: "100px",
                    }}
                    onClick={this.login}>
                    Login
                  </button>
                  <br />
                  <br />
                  <br />
                  <span style={{ color: "red" }}>{this.state.errorText}</span>
                </div>
              </center>
            </div>
          </div>
        </center>
        <div style={{ position: "absolute", top: "50%", left: "50%" }}>
          {this.spinnerFunction()}
        </div>
        <div className='section'></div>
        <div className='section'></div>
      </main>
    );
  }

  login = () => {
    this.setState({ loadSpinner: true });

    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(function () {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return firebase
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password);
      })
      .then(() => {
        this.props.history.replace("/");
        this.setState({ loadSpinner: false });
      })
      .catch((error) => {
        this.setState({
          loadSpinner: false,
          errorText: error.message,
        });
      });
  };

  spinnerFunction = () => {
    if (this.state.loadSpinner) {
      return <SpinnerComp />;
    }
  };

  isLoggedIn = () => {
    var user = firebase.auth().currentUser;
    if (user === null) return <Redirect to='/login' />;
    else return <Redirect to='/' />;
  };
}

export default Login;
