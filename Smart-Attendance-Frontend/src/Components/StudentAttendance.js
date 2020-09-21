/** @format */

import React from "react";
import { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import Axios from "axios";
import SpinnerComp from "./SpinnerComp";
import ToolkitProvider, { CSVExport } from "react-bootstrap-table2-toolkit";
const { ExportCSVButton } = CSVExport;

export default class StudentAttendance extends Component {
  state = {
    enrollment: "",
    division: "",
    columns: [
      {
        dataField: "date",
        text: "Date",
      },
      {
        dataField: "subject",
        text: "Subject",
      },
    ],
    data: [
      {
        date: "2020-03-20",
        subject: "P",
      },
    ],
    loadSpinner: false,
  };

  componentDidMount() {
    const { endiv } = this.props.match.params;
    this.setState({
      enrollment: endiv.split("-")[0],
      division: endiv.split("-")[1],
      loadSpinner: true,
    });
    Axios.get(
      `${process.env.REACT_APP_backUrl}/get/subjects/report-${
        endiv.split("-")[1]
      }`,
    ).then((res) => {
      Axios.post(`${process.env.REACT_APP_backUrl}/get/attendancesheet`, {
        enrollment: endiv.split("-")[0],
        subjects: res.data,
      }).then(({ data }) => {
        this.setState({
          data: data.newrows,
          columns: data.cols,
        });
        this.setState({ loadSpinner: false });
      });
    });
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
          padding: "2%",
          height: "100%",
          background: "linear-gradient(to bottom, #d5dae5, #e4e6ed, #f2f2f6)",
        }}>
        <div
          style={{
            fontFamily: "Verdana",
            fontSize: "30px",
            color: "#535C68",
            padding: "20px",
          }}>
          Attendance Sheet
          <hr />
          {`${this.state.enrollment}`}
        </div>

        <div className='row'>
          <ToolkitProvider
            keyField='enrollment'
            data={this.state.data}
            columns={this.state.columns}
            exportCSV={{
              fileName: `${this.state.enrollment}- AttendanceSheet.csv`,
            }}>
            {(props) => (
              <div>
                <BootstrapTable
                  keyField='enrollment'
                  data={this.state.data}
                  columns={this.state.columns}
                  {...props.baseProps}
                />
                <hr />
                <ExportCSVButton {...props.csvProps}>
                  Export CSV!!
                </ExportCSVButton>
              </div>
            )}
          </ToolkitProvider>
        </div>
        <div style={{ position: "absolute", top: "50%", left: "50%" }}>
          {this.spinnerFunction()}
        </div>
      </div>
    );
  }
}
