/** @format */

import React, { Component } from "react";
import { Select } from "react-materialize";
import axios from "axios";
import Firebase from "./Firebase";
import SpinnerComp from "./SpinnerComp";
import { Redirect } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

class RegisterStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      enroll: "",
      name: "",
      division: "H3",
      batch: "A Batch",
      email: "",
      phoneno: "",
      imgUrl:
        "https://www.nationalgeographic.com/content/dam/photography/rights-exempt/best-of-decade/best-of-the-decade-john-stanmeyer-out-of-eden.jpg",
      imgStatus: "Invalid image ! No face detected ):",
      loadSpinner: false,
    };
  }

  spinnerFunction = () => {
    if (this.state.loadSpinner) {
      return <SpinnerComp />;
    }
  };

  isLoggedIn = () => {
    if (localStorage.getItem("uid") === null) return <Redirect to='/login' />;
  };

  render() {
    return (
      <div className='row'>
        {this.isLoggedIn()}
        <div className='col s5'>
          <div className='container valign'>
            <div className='white col s12'>
              &nbsp;
              <h5 className='grey-text text-darken-3 left-align'>
                New Student
              </h5>
              &nbsp;
              <div className='input-field'>
                <label htmlFor='std-enroll'>Student Enrollment No.</label>
                <input
                  type='text'
                  id='std-enroll'
                  value={this.state.enroll}
                  onChange={(text) =>
                    this.setState({ enroll: text.target.value })
                  }
                />
              </div>
              <div className='input-field'>
                <label htmlFor='std-name'>Student Name</label>
                <input
                  type='text'
                  id='std-name'
                  value={this.state.name}
                  onChange={(text) =>
                    this.setState({ name: text.target.value })
                  }
                />
              </div>
              <div>
                <Select
                  label='Select Student Division'
                  onChange={(selected) => {
                    this.setState({ division: selected.target.value });
                  }}
                  options={{
                    classes: "",
                    dropdownOptions: {
                      alignment: "left",
                      autoTrigger: true,
                      closeOnClick: true,
                      constrainWidth: true,
                      container: null,
                      coverTrigger: true,
                      hover: false,
                      inDuration: 150,
                      onCloseEnd: null,
                      onCloseStart: null,
                      onOpenEnd: null,
                      onOpenStart: null,
                      outDuration: 250,
                    },
                  }}>
                  <option value='H3'>H3</option>
                  <option value='G3'>G3</option>
                </Select>
                <Select
                  label='Select Student Batch'
                  onChange={(selected) => {
                    this.setState({ batch: selected.target.value });
                  }}
                  options={{
                    classes: "",
                    dropdownOptions: {
                      alignment: "left",
                      autoTrigger: true,
                      closeOnClick: true,
                      constrainWidth: true,
                      container: null,
                      coverTrigger: true,
                      hover: false,
                      inDuration: 150,
                      onCloseEnd: null,
                      onCloseStart: null,
                      onOpenEnd: null,
                      onOpenStart: null,
                      outDuration: 250,
                    },
                  }}>
                  <option value='A Batch'>A Batch</option>
                  <option value='B Batch'>B Batch</option>
                  <option value='C Batch'>C Batch</option>
                </Select>
              </div>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <div className='input-field'>
                <label htmlFor='std-mail'>Student Email</label>
                <input
                  type='email'
                  id='std-mail'
                  value={this.state.email}
                  onChange={(text) =>
                    this.setState({ email: text.target.value })
                  }
                />
              </div>
              <div className='input-field'>
                <label htmlFor='std-phoneno'>Student Phone</label>
                <input
                  type='text'
                  id='std-phoneno'
                  value={this.state.phoneno}
                  onChange={(text) =>
                    this.setState({ phoneno: text.target.value })
                  }
                />
              </div>
              <div className='file-field input-field'>
                <div className='teal btn  white-text'>
                  <span className=''>Input Image</span>
                  <input
                    type='file'
                    onChange={(event) => {
                      this.setState({ loadSpinner: true });
                      let storageRef = Firebase.storage().ref("StudentImages");
                      let firstFile = event.target.files[0]; // upload the first file only
                      storageRef
                        .child(uuidv4())
                        .put(firstFile)
                        .then((refer) => {
                          refer.ref.getDownloadURL().then((imgUrlDownload) => {
                            console.log(imgUrlDownload);
                            this.setState({
                              imgUrl: imgUrlDownload,
                              loadSpinner: false,
                            });
                            this.setState({ loadSpinner: true });
                            axios
                              .post(
                                process.env.REACT_APP_backUrl + "/checkFace",
                                {
                                  img: imgUrlDownload,
                                },
                              )
                              .then((response1) => {
                                console.log(response1.data);
                                this.setState({
                                  imgStatus: response1.data,
                                  loadSpinner: false,
                                });
                              });
                          });
                        });
                    }}
                  />
                </div>
                <div className='file-path-wrapper'>
                  <input className='file-path validate' type='text' />
                </div>
              </div>
              <div className='input-field'>
                <button
                  className='btn teal z-depth-10 white-text'
                  onClick={this.registerStd}>
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='col s6'>
          <div className='card'>
            <div className='card-image'>
              <img
                src={this.state.imgUrl}
                alt='Student'
                className='card-img-top'
              />
              <span className='card-title '>Student Image</span>
            </div>
            <div className='card-content'>
              <h5 style={{ color: "red" }}>{this.state.imgStatus}</h5>
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", top: "50%", left: "50%" }}>
          {this.spinnerFunction()}
        </div>
      </div>
    );
  }

  registerStd = () => {
    console.log(this.state.enroll);
    this.setState({ loadSpinner: true });
    var url =
      `${process.env.REACT_APP_backUrl}/register/check/` + this.state.enroll;
    axios.get(url).then((res) => {
      if (res.data === "Found") {
        alert("exist");
        this.setState({ loadSpinner: false });
      }
      if (res.data === "NotFound") {
        axios
          .post(`${process.env.REACT_APP_backUrl}/register/reg`, {
            studentEnrollment: this.state.enroll,
            studentName: this.state.name,
            studentDivision: this.state.division,
            studentBatch: this.state.batch,
            studentEmail: this.state.email,
            studentPhone: this.state.phoneno,
            studentImage: this.state.imgUrl,
          })
          .then((res2) => {
            if (res2.data === "Created") {
              alert("Account Created");
              this.setState({ loadSpinner: false });
            } else {
              alert("Unexpected error");
            }
          });
      }
      console.log(res.data);
    });
  };
}

export default RegisterStudent;
