/** @format */

import React from "react";
import { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import axios from "axios";
import SpinnerComp from "./SpinnerComp";
import ToolkitProvider, { CSVExport } from "react-bootstrap-table2-toolkit";
import { Button } from "react-materialize";
const { ExportCSVButton } = CSVExport;

export default class ShowAttendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sub: "",
      date: "",
      enrollemntNo: "",
      enroll: [
        {
          enrollment: "1706105",
          present: "P",
        },
      ],
      all: [
        {
          dataField: "enrollment",
          text: "Enrollment Number",
        },
      ],
      loadSpinner: false,
    };
  }

  componentDidMount() {
    this.setState({ loadSpinner: true });
    const { subDate } = this.props.match.params;
    this.setState({ sub: subDate.split(":")[0], date: subDate.split(":")[1] });
    console.log(subDate.split(":")[0], subDate.split(":")[1]);
    axios
      .get(process.env.REACT_APP_backUrl + "/showAttendance/subject/" + subDate)
      .then((res) => {
        var arr = [];
        var arr2 = [];
        arr.push({
          dataField: "enrollment",
          text: "Enrollment Number",
        });
        res.data.map((call) => {
          arr.push({
            dataField: call.date,
            text: call.date,
            editor: {
              type: Type.CHECKBOX,
              value: "P:A",
            },
          });
          return "";
        });
        res.data.map((call) => {
          for (var key in call.present) {
            arr2.push({
              enrollment: key,
              [call.date]: "P",
            });
          }
          return "";
        });
        console.log(arr2);
        this.setState({ all: arr, enroll: arr2 });
        arr2 = [];
        arr = [];
        this.setState({ loadSpinner: false });
      });
  }

  spinnerFunction = () => {
    if (this.state.loadSpinner) {
      return <SpinnerComp />;
    }
  };

  render() {
    const { subDate } = this.props.match.params;
    return (
      <main
        style={{
          background: "linear-gradient(to bottom, #d5dae5, #e4e6ed, #f2f2f6)",
        }}>
        <div className='container'>
          <br />
          <div
            style={{
              fontFamily: "Verdana",
              fontSize: "30px",
              color: "#535C68",
              padding: "10px",
            }}>
            {`${this.state.sub} Attendance `}
          </div>

          <div className='row container'>
            <div className=' input-field col l6'>
              <label htmlFor='std-enroll'>Enrollment No.</label>
              <input
                type='number'
                id='std-enroll'
                onChange={(enrollemntNo) => {
                  this.setState({ enrollemntNo: enrollemntNo.target.value });
                }}
                value={this.state.enrollemntNo}
              />
            </div>
            <div className='col l4'>
              <Button
                style={{ marginTop: "20px" }}
                className='cyan'
                onClick={() => {
                  this.setState({ loadSpinner: true });
                  axios
                    .post(`${process.env.REACT_APP_backUrl}/attendance/mark`, {
                      subject: this.state.sub,
                      date: this.state.date,
                      enrollment: this.state.enrollemntNo,
                    })
                    .then(({ data }) => {
                      alert(data);
                      this.setState({ loadSpinner: false });
                    });
                }}>
                Mark Attendance
              </Button>
            </div>
            <div className='col l2'>
              <Button
                style={{ marginTop: "20px" }}
                className='red lighten-2'
                onClick={() => {
                  this.setState({ loadSpinner: true });
                  axios
                    .post(
                      `${process.env.REACT_APP_backUrl}/attendance/revoke`,
                      {
                        subject: this.state.sub,
                        date: this.state.date,
                        enrollment: this.state.enrollemntNo,
                      },
                    )
                    .then(({ data }) => {
                      alert(data);
                      this.setState({ loadSpinner: false });
                    });
                }}>
                Revoke
              </Button>
            </div>
          </div>
          <ToolkitProvider
            keyField='enrollment'
            data={this.state.enroll}
            columns={this.state.all}
            exportCSV={{
              fileName: `${subDate}.csv`,
            }}>
            {(props) => (
              <div>
                <BootstrapTable
                  keyField='enrollment'
                  data={this.state.enroll}
                  columns={this.state.all}
                  cellEdit={cellEditFactory({
                    mode: "click",
                    blurToSave: true,
                  })}
                  {...props.baseProps}
                />
                <hr />
                <ExportCSVButton {...props.csvProps}>
                  Export CSV!!
                </ExportCSVButton>
              </div>
            )}
          </ToolkitProvider>
          <div
            style={{
              position: "absolute",
              top: "45%",
              left: "45%",
              zIndex: 100000,
            }}>
            {this.spinnerFunction()}
          </div>
        </div>
      </main>
    );
  }
}
