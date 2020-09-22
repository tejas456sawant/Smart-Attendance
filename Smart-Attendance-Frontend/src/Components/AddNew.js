/** @format */

import React from "react";
import { Component } from "react";
import { Select } from "react-materialize";
import Axios from "axios";
import { Link } from "react-router-dom";
import SpinnerComp from "./SpinnerComp";

export default class AddNew extends Component {
  state = {
    divisions: [],
    selectedDivision: "",
    divisionName: "",
    classorlab: "",
    loadSpinner: false,
    suborprac: "",
  };

  componentDidMount() {
    this.setState({ loadSpinner: true });
    Axios.get(`${process.env.REACT_APP_backUrl}/get/division`).then(
      ({ data }) => {
        this.setState({ divisions: data, loadSpinner: false });
      }
    );
  }

  spinnerFunction = () => {
    if (this.state.loadSpinner) {
      return <SpinnerComp />;
    }
  };

  render() {
    return (
      <div
        style={{
          background:
            "linear-gradient(to bottom,#d5dae5,#d5dae5, #e4e6ed, #f2f2f6",
          height: "100%",
        }}
      >
        <div className="row container" style={{ height: "100%" }}>
          <div className="col l4 addcard">
            <div
              className="addcard2"
              style={{
                background:
                  "linear-gradient(to top, #119970, rgb(80, 230, 172))",
              }}
            >
              <div className="left left-align">
                <span style={{ textAlign: "left", fontSize: "55px" }}>New</span>
                <br />
                <span style={{ textAlign: "left", fontSize: "40px" }}>
                  Student
                </span>
              </div>
              <a href="#!">
                <Link to="/register">
                  <i className="large material-icons right icon12">add</i>
                </Link>
              </a>
            </div>
          </div>
          <div className="col l8 addcard">
            <div className="addcard2">
              <div className="left-align">Add Subject</div>
              <div className="row" style={{ marginTop: "6%" }}>
                <div className="col l3 news">
                  <Select
                    className="newselect"
                    onChange={(selected) => {
                      this.setState({
                        selectedDivision: selected.target.value,
                      });
                    }}
                    value={this.state.selectedDivision}
                    options={{
                      dropdownOptions: {
                        alignment: "left",
                        autoTrigger: true,
                        closeOnClick: true,
                        constrainWidth: null,
                        container: true,
                        coverTrigger: true,
                        inDuration: 150,
                        outDuration: 250,
                      },
                    }}
                  >
                    <option value="SelectDivision">Select Division</option>
                    {this.state.divisions.map((division) => (
                      <option value={division} key={division}>
                        {division}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="col l9 container news">
                  <input
                    type="text"
                    placeholder="SUB-Lec/Prac"
                    style={{
                      marginTop: "5%",
                      background: "#ffffff40",
                      border: "none",
                      width: "65%",
                      borderRadius: "20px",
                      paddingLeft: "10px",
                      color: "white",
                    }}
                    onChange={(text) => {
                      this.setState({ suborprac: text.target.value });
                    }}
                    value={this.state.suborprac}
                  />
                  <span
                    onClick={() => {
                      this.setState({ loadSpinner: true });
                      Axios.post(
                        `${process.env.REACT_APP_backUrl}/set/subject`,
                        {
                          division: this.state.selectedDivision,
                          subject: this.state.suborprac,
                        }
                      ).then(({ data }) => {
                        this.setState({ loadSpinner: false });
                        return alert(data);
                      });
                    }}
                  >
                    <i
                      className="medium material-icons icon12"
                      style={{ verticalAlign: "middle", cursor: "pointer" }}
                    >
                      add
                    </i>
                  </span>
                </div>
                <br />
                <span
                  style={{
                    color: "white-text",
                    fontSize: "20px",
                  }}
                  className="container"
                >{`${this.state.suborprac}-${this.state.selectedDivision}`}</span>
              </div>
            </div>
          </div>
          <div className="col l6 addcard">
            <div
              className="addcard2 news"
              style={{
                background: " linear-gradient(rgb(114, 136, 255), #673AB7)",
              }}
            >
              <div className="left-align">Add Division</div>
              <input
                type="text"
                placeholder="Division"
                style={{
                  marginTop: "12%",
                  background: "#ffffff40",
                  border: "none",
                  width: "65%",
                  borderRadius: "20px",
                  paddingLeft: "10px",
                  color: "white",
                }}
                value={this.state.divisionName}
                onChange={(text) => {
                  this.setState({ divisionName: text.target.value });
                }}
              />
              <span
                onClick={() => {
                  this.setState({ loadSpinner: true });
                  Axios.post(`${process.env.REACT_APP_backUrl}/set/division`, {
                    division: this.state.divisionName,
                  }).then(({ data }) => {
                    this.setState({ loadSpinner: false });
                    return alert(data);
                  });
                }}
              >
                <i
                  className="medium material-icons icon12"
                  style={{ verticalAlign: "middle", cursor: "pointer" }}
                >
                  add
                </i>
              </span>
            </div>
          </div>
          <div className="col l6 addcard">
            <div
              className="addcard2 news"
              style={{
                background: "linear-gradient(to bottom, #00c6ff, #0072ff)",
              }}
            >
              <div className="left-align">Add Classroom or Lab</div>
              <input
                type="text"
                placeholder="Classroom"
                style={{
                  marginTop: "12%",
                  background: "#ffffff40",
                  border: "none",
                  width: "65%",
                  borderRadius: "20px",
                  paddingLeft: "10px",
                  color: "white",
                }}
                value={this.state.classorlab}
                onChange={(text) => {
                  this.setState({ classorlab: text.target.value });
                }}
              />

              <span
                onClick={() => {
                  this.setState({ loadSpinner: true });
                  Axios.post(
                    `${process.env.REACT_APP_backUrl}/set/classorlab`,
                    {
                      classorlab: this.state.classorlab,
                    }
                  ).then(({ data }) => {
                    this.setState({ loadSpinner: false });
                    return alert(data);
                  });
                }}
              >
                <i
                  className="medium material-icons icon12"
                  style={{ verticalAlign: "middle", cursor: "pointer" }}
                >
                  add
                </i>
              </span>
            </div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: "45%",
            left: "45%",
            zIndex: 100000,
          }}
        >
          {this.spinnerFunction()}
        </div>
      </div>
    );
  }
}
