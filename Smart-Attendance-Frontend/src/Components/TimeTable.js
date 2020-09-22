/** @format */

import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import axios from "axios";
import SpinnerComp from "./SpinnerComp";
import { Redirect } from "react-router-dom";
import { Select } from "react-materialize";
import Axios from "axios";
import firebase from "firebase/app";
import "firebase/auth";

class TimeTable extends Component {
  state = {
    data: [],
    loadSpinner: false,
    saving: "",
    selectedTable: "Select Classroom or Lab",
    classOrLab: [],
    subjects: [],
  };

  componentDidMount() {
    this.setState({ loadSpinner: true });
    Axios.get(`${process.env.REACT_APP_backUrl}/get/classorlab`).then(
      ({ data }) => {
        this.setState({ classOrLab: data, loadSpinner: false });
      }
    );
    Axios.get(`${process.env.REACT_APP_backUrl}/get/subjects/table`).then(
      ({ data }) => {
        this.setState({ subjects: data, loadSpinner: false });
      }
    );
  }

  isLoggedIn = () => {
    if (firebase.auth().currentUser === null) return <Redirect to="/login" />;
  };

  spinnerFunction = () => {
    if (this.state.loadSpinner) {
      return <SpinnerComp />;
    }
  };

  render() {
    return (
      <div style={{ margin: 50, borderColor: "black", borderWidth: 10 }}>
        <div className="container">
          <div className="col3">
            <Select
              label="Select Classroom"
              onChange={(selected) => {
                this.setState({
                  selectedTable: selected.target.value,
                  loadSpinner: true,
                });
                Axios.get(
                  `${process.env.REACT_APP_backUrl}/table/get/${selected.target.value}`
                ).then(({ data }) => {
                  this.setState({ data, loadSpinner: false });
                });
              }}
              value={this.state.selectedTable}
              options={{
                classes: "",
                dropdownOptions: {
                  alignment: "left",
                  autoTrigger: true,
                  closeOnClick: true,
                  constrainWidth: false,
                  container: true,
                  coverTrigger: true,
                  inDuration: 150,
                  outDuration: 250,
                },
              }}
            >
              <option value="Select Classroom or Lab">
                Select Classroom or Lab
              </option>
              {this.state.classOrLab.map((room) => (
                <option value={room} key={room}>
                  {room}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <hr />
        <BootstrapTable
          keyField="id"
          data={this.state.data}
          columns={[
            {
              dataField: "id",
              text: "Slots",
            },
            {
              dataField: "Monday",
              text: "Monday",
              editor: {
                type: Type.SELECT,
                getOptions: (setOptions, { row, column }) => {
                  return this.state.subjects;
                },
              },
            },
            {
              dataField: "Tuesday",
              text: "Tuesday",
              editor: {
                type: Type.SELECT,
                getOptions: (setOptions, { row, column }) => {
                  return this.state.subjects;
                },
              },
            },
            {
              dataField: "Wednesday",
              text: "Wednesday",
              editor: {
                type: Type.SELECT,
                getOptions: (setOptions, { row, column }) => {
                  return this.state.subjects;
                },
              },
            },
            {
              dataField: "Thursday",
              text: "Thursday",
              editor: {
                type: Type.SELECT,
                getOptions: (setOptions, { row, column }) => {
                  return this.state.subjects;
                },
              },
            },
            {
              dataField: "Friday",
              text: "Friday",
              editor: {
                type: Type.SELECT,
                getOptions: (setOptions, { row, column }) => {
                  return this.state.subjects;
                },
              },
            },
            {
              dataField: "Saturday",
              text: "Saturday",
              editor: {
                type: Type.SELECT,
                getOptions: (setOptions, { row, column }) => {
                  return this.state.subjects;
                },
              },
            },
          ]}
          cellEdit={cellEditFactory({
            mode: "click",
            blurToSave: true,
            beforeSaveCell: (oldValue, newValue, row, column) => {
              var sendObj = {
                oldVal: `${oldValue}`,
                newVal: `${newValue}`,
                row: `${row.id}`,
                col: `${column.dataField}`,
              };
              if (oldValue === newValue) {
                alert("No changes made");
              } else {
                this.setState({ loadSpinner: true, saving: "Saving...." });
                axios
                  .put(
                    `${process.env.REACT_APP_backUrl}/table/update/${this.state.selectedTable}`,
                    sendObj
                  )
                  .then((res) => {
                    if (res.data === "updated..")
                      this.setState({
                        loadSpinner: false,
                        saving: "All Changes Saved..",
                      });
                  });
              }
            },
          })}
          striped
          hover
          condensed
        />
        <hr />
        <blockquote></blockquote>
        <center className="red-text flow-text h1">
          {this.state.selectedTable === "Select Classroom or Lab"
            ? "Please Select Classroom or Lab."
            : ""}
          <br />
          {this.state.saving}
        </center>
        <div style={{ position: "absolute", top: "50%", left: "50%" }}>
          {this.spinnerFunction()}
        </div>
      </div>
    );
  }
}

export default TimeTable;
