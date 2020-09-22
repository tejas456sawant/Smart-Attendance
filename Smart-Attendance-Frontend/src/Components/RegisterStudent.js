/** @format */

import React, { Component } from "react";
import { Select } from "react-materialize";
import axios from "axios";
import SpinnerComp from "./SpinnerComp";
import { Redirect } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import * as faceapi from "face-api.js";

faceapi.env.monkeyPatch({
  Canvas: HTMLCanvasElement,
  Image: HTMLImageElement,
  ImageData: ImageData,
  Video: HTMLVideoElement,
  createCanvasElement: () => document.createElement("canvas"),
  createImageElement: () => document.createElement("img"),
});

class RegisterStudent extends Component {
  state = {
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

  componentDidMount() {
    const MODEL_URL = process.env.PUBLIC_URL + "/models";
    Promise.all([
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
    ]).then(console.log("Models Loaded"));
  }

  spinnerFunction = () => {
    if (this.state.loadSpinner) {
      return <SpinnerComp />;
    }
  };

  isLoggedIn = () => {
    if (firebase.auth().currentUser === null) return <Redirect to="/login" />;
  };

  uploadFile = (file) => {
    this.setState({
      imgStatus: "Uploading Image....",
      loadSpinner: true,
    });
    let storageRef = firebase.storage().ref("StudentImages");
    storageRef
      .child(uuidv4())
      .put(file)
      .then((refer) => {
        refer.ref.getDownloadURL().then((imgUrlDownload) => {
          this.setState({
            imgStatus: "Upload Done :)",
            imgUrl: imgUrlDownload,
            loadSpinner: false,
          });
        });
      });
  };
  render() {
    return (
      <div className="row">
        <div className="col s5">
          <div className="container valign">
            <div className="white col s12">
              &nbsp;
              <h5 className="grey-text text-darken-3 left-align">
                New Student
              </h5>
              &nbsp;
              <div className="input-field">
                <label htmlFor="std-enroll">Student Enrollment No.</label>
                <input
                  type="text"
                  id="std-enroll"
                  value={this.state.enroll}
                  onChange={(text) =>
                    this.setState({ enroll: text.target.value })
                  }
                  required
                />
              </div>
              <div className="input-field">
                <label htmlFor="std-name">Student Name</label>
                <input
                  type="text"
                  id="std-name"
                  value={this.state.name}
                  onChange={(text) =>
                    this.setState({ name: text.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Select
                  label="Select Student Division"
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
                  }}
                >
                  <option value="H3">H3</option>
                  <option value="G3">G3</option>
                </Select>
                <Select
                  label="Select Student Batch"
                  onChange={(selected) => {
                    this.setState({ batch: selected.target.value });
                  }}
                  options={{
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
                  }}
                >
                  <option value="A Batch">A Batch</option>
                  <option value="B Batch">B Batch</option>
                  <option value="C Batch">C Batch</option>
                </Select>
              </div>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <div className="input-field">
                <label htmlFor="std-mail">Student Email</label>
                <input
                  type="email"
                  id="std-mail"
                  value={this.state.email}
                  onChange={(text) =>
                    this.setState({ email: text.target.value })
                  }
                />
              </div>
              <div className="input-field">
                <label htmlFor="std-phoneno">Student Phone</label>
                <input
                  type="text"
                  id="std-phoneno"
                  value={this.state.phoneno}
                  onChange={(text) =>
                    this.setState({ phoneno: text.target.value })
                  }
                />
              </div>
              <div className="file-field input-field">
                <div className="teal btn white-text">
                  <span>Input Image</span>
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={async (event) => {
                      event.persist();
                      this.setState({ loadSpinner: true });
                      console.log(URL.createObjectURL(event.target.files[0]));
                      let img = await faceapi.fetchImage(
                        URL.createObjectURL(event.target.files[0])
                      );
                      this.setState({
                        imgUrl: URL.createObjectURL(event.target.files[0]),
                      });
                      const detections = await faceapi
                        .detectAllFaces(img)
                        .withFaceLandmarks()
                        .withFaceDescriptors();
                      if (detections.length === 0) {
                        this.setState({
                          imgStatus: "Invalid image ! No face detected ):",
                          loadSpinner: false,
                        });
                      }
                      if (detections.length === 1) {
                        this.setState({
                          imgStatus: "Valid Image . One face detected :)",
                          loadSpinner: false,
                        });
                        this.uploadFile(event.target.files[0]);
                      }
                      if (detections.length > 1) {
                        this.setState({
                          imgStatus: `Invalid image ! ${detections.length} faces detected :(`,
                          loadSpinner: false,
                        });
                      }
                      console.log(detections.length);
                    }}
                  />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" />
                </div>
              </div>
              <div className="input-field">
                <button
                  className="btn teal z-depth-10 white-text"
                  onClick={this.registerStd}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col s6">
          <div className="card">
            <div className="card-image">
              <img
                src={this.state.imgUrl}
                alt="Student"
                className="card-img-top"
              />
              <span className="card-title ">Student Image</span>
            </div>
            <div className="card-content">
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
