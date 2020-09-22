/** @format */

import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import SpinnerComp from "./SpinnerComp";

const Queries = () => {
  const [complaints, setComplaints] = useState([]);
  const [loadSpinner, setLoadSpinner] = useState(false);

  useEffect(() => {
    setLoadSpinner(true);
    firebase
      .firestore()
      .collection("Complaints")
      .get()
      .then((comps) => {
        var dummyArray = [];
        comps.docs.forEach((comp) => {
          if (comp.get("status") === "No") {
            dummyArray.push({
              cid: comp.id,
              enrollment: comp.get("enrollment"),
              message: comp.get("message"),
            });
          }
        });
        setComplaints(dummyArray);
        dummyArray = [];
        setLoadSpinner(false);
      });
  }, []);

  const spinnerFunction = () => {
    if (loadSpinner) {
      return <SpinnerComp />;
    }
  };

  if (complaints.length > 0) {
    return (
      <div className="row container" style={{ marginTop: "10px" }}>
        {complaints.map((complaint) => (
          <div className="col l12" key={complaint.cid}>
            <div
              className="card "
              style={{
                height: "125px",
                borderRadius: "10px",
                background:
                  "linear-gradient(to left top, #708294, #7d8fa1, #8a9cae, #97a9bb, #a4b6c9)",
              }}
            >
              <div className="card-content row">
                <div
                  className="row col l6"
                  style={{
                    fontSize: "15px",
                    color: "rgb(255, 255, 255)",
                    fontFamily: "Varela Round",
                  }}
                >
                  <div
                    className="col l4"
                    style={{
                      marginTop: "15px",
                      textAlign: "left",
                      padding: "0px",
                    }}
                  >
                    {complaint.enrollment} <br />
                  </div>
                  <div
                    className="col l4"
                    style={{
                      marginTop: "15px",
                      textAlign: "left",
                      paddingTop: "10px",
                    }}
                  >
                    <div
                      className="btn-small waves-effect waves-light red lighten-2"
                      style={{
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        borderRadius: "10px",
                      }}
                      onClick={() => {
                        setLoadSpinner(false);
                        firebase
                          .firestore()
                          .collection("Complaints")
                          .doc(complaint.cid)
                          .set(
                            {
                              status: "Yes",
                            },
                            {
                              merge: true,
                            }
                          )
                          .then(() => {
                            alert("Solved");
                            setLoadSpinner(false);
                          });
                      }}
                    >
                      Remove
                    </div>
                  </div>
                </div>
                <span className="card-title activator white-text col l6">
                  <i className="material-icons right">more_vert</i>
                </span>
              </div>
              <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">
                  {complaint.enrollment}
                  <i className="material-icons right">close</i>
                </span>
                <blockquote>{complaint.message}</blockquote>
              </div>
            </div>
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            zIndex: 100000,
          }}
        >
          {spinnerFunction()}
        </div>
      </div>
    );
  }
  console.log(complaints.length);
  if (complaints.length <= 0) {
    return (
      <div className="container" style={{ marginTop: "30vh" }}>
        <center className="red-text flow-text h1">No Complaints</center>
      </div>
    );
  }
};

export default Queries;
