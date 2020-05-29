/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import Firebase from "./Firebase";
import SpinnerComp from "./SpinnerComp";
import Axios from "axios";

const EditInfo = ({ match }) => {
  const { enroll } = match.params;

  const [editUser, setEditUser] = useState({
    StudentPhone: "1234567890",
    StudentEnrollment: "1234567",
    StudentEmail: "abc@xyz.com",
    StudentImage:
      "https://www.nationalgeographic.com/content/dam/photography/rights-exempt/best-of-decade/best-of-the-decade-john-stanmeyer-out-of-eden.jpg",
    imgStatus: "Valid Image!!!",
    loadSpinner: false,
  });

  const {
    StudentPhone,
    StudentEnrollment,
    StudentImage,
    StudentEmail,
    imgStatus,
    loadSpinner,
  } = editUser;

  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_backUrl}/users/getinfo/enroll/${enroll}`,
    ).then(({ data }) => {
      const {
        StudentPhone,
        StudentEnrollment,
        StudentImage,
        StudentEmail,
      } = data;
      setEditUser({
        ...editUser,
        StudentPhone,
        StudentEnrollment,
        StudentImage,
        StudentEmail,
      });
    });
  }, [editUser, enroll]);

  const spinnerFunction = () => {
    if (loadSpinner) {
      return <SpinnerComp style={{ position: "absolute", left: "100%" }} />;
    }
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        background:
          "linear-gradient(to top,  #d5dae5, #d5dae5, #e4e6ed, #f2f2f6)",
      }}>
      <div className='container fluid'>
        <div className='row' style={{ margin: "0px" }}>
          <form className='col l6' method='post'>
            <div className='row'>
              <div className='col l12'></div>
            </div>

            <div className='row' style={{ marginBottom: "0px" }}>
              <div className='input-field col s12'>
                <input
                  className='validate'
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Change Email'
                  value={StudentEmail}
                  onChange={(text) => {
                    setEditUser({
                      ...editUser,
                      StudentEmail: text.target.value,
                    });
                  }}
                />
              </div>
            </div>

            <div className='row' style={{ marginBottom: "0px" }}>
              <div className='input-field col s12 '>
                <input
                  className='validate'
                  type='text'
                  name='number'
                  id='number'
                  placeholder='Change Phone No'
                  value={StudentPhone}
                  onChange={(text) => {
                    setEditUser({
                      ...editUser,
                      StudentPhone: text.target.value,
                    });
                  }}
                />
              </div>
            </div>

            <div className='file-field input-field'>
              <div
                className='blue btn-small  white-text'
                style={{ borderRadius: "10px" }}>
                <span className=''>Change Image</span>
                <input
                  type='file'
                  onChange={(event) => {
                    setEditUser({ ...editUser, loadSpinner: true });
                    let storageRef = Firebase.storage().ref("StudentImages");
                    let firstFile = event.target.files[0]; // upload the first file only
                    storageRef
                      .child(StudentEnrollment)
                      .put(firstFile)
                      .then((refer) => {
                        refer.ref.getDownloadURL().then((imgUrlDownload) => {
                          console.log(imgUrlDownload);
                          setEditUser({
                            ...editUser,
                            imgUrl: imgUrlDownload,
                            loadSpinner: false,
                          });
                          setEditUser({ ...editUser, loadSpinner: true });
                          axios
                            .post("http://localhost:3000/checkFace", {
                              img: imgUrlDownload,
                            })
                            .then((response1) => {
                              console.log(response1.data);
                              setEditUser({
                                ...editUser,
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

            <br />
            <center>
              <div className='row'>
                <button
                  type='submit'
                  name='btn_login'
                  className='col s12 btn-large  waves-effect cyan center'
                  style={{
                    width: "80%",
                    borderRadius: "10px",
                    background: " rgba(0,206,255,0.4)",
                  }}>
                  Update Information
                </button>
              </div>
            </center>
          </form>

          <div className='col l6'>
            <div className='card z-depth-0'>
              <div className='card-image'>
                <img src={StudentImage} alt='Student' />
                <span className='card-title '>Student Image</span>
              </div>
              <div className='card-content'>
                <h6 style={{ color: "red" }}>{imgStatus}</h6>
              </div>
            </div>
          </div>
          <div style={{ position: "absolute", top: "50%", left: "50%" }}>
            {spinnerFunction}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInfo;
