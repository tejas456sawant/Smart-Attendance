/** @format */

import React from "react";
import { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import SpinnerComp from "./SpinnerComp";
import ToolkitProvider, { CSVExport } from "react-bootstrap-table2-toolkit";
import { Col, Row, Select, Button } from "react-materialize";
import Axios from "axios";
const { ExportCSVButton } = CSVExport;

export default class GenerateReports extends Component {
  state = {
    divisions: [],
    subjects: [],
    sub: "",
    date: "",
    division: "H3",
    batch: "A Batch",
    tableData: [
      {
        enrollment: "1706108",
      },
    ],
    tableColumns: [
      {
        dataField: "enrollment",
        text: "Enrollment No",
      },
    ],
    selectedDivision: "",
    selectedSubject: "",
    selectedBatch: "",
    loadSpinner: false,
  };

  componentDidMount() {
    this.setState({ loadSpinner: true });
    Axios.get(`${process.env.REACT_APP_backUrl}/get/division`).then(
      ({ data }) => {
        this.setState({ divisions: data, loadSpinner: false });
      },
    );
  }

  spinnerFunction = () => {
    if (this.state.loadSpinner) {
      return <SpinnerComp />;
    }
  };

  render() {
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
              padding: "20px",
            }}>
            <Row>
              <Col>
                <Select
                  label='Student Division'
                  onChange={(selected) => {
                    this.setState({
                      selectedDivision: selected.target.value,
                      loadSpinner: true,
                    });
                    if (selected.target.value === "SelectDivision") {
                      this.setState({ loadSpinner: false });
                      return 0;
                    } else {
                      Axios.get(
                        `${process.env.REACT_APP_backUrl}/get/subjects/report-${selected.target.value}`,
                      ).then(({ data }) => {
                        this.setState({ subjects: data, loadSpinner: false });
                      });
                    }
                  }}
                  value={this.state.selectedDivision}
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
                  <option value='SelectDivision' key={"SelectDivision"}>
                    Select Division
                  </option>
                  {this.state.divisions.map((division) => (
                    <option value={division} key={division}>
                      {division}
                    </option>
                  ))}
                </Select>
              </Col>
              <Col>
                <Select
                  label='Student Batch'
                  onChange={(selected) => {
                    this.setState({ selectedBatch: selected.target.value });
                  }}
                  value={this.state.selectedBatch}
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
              </Col>
              <Col>
                <Select
                  label='Subjects'
                  onChange={(selected) => {
                    this.setState({ selectedSubject: selected.target.value });
                  }}
                  value={this.state.selectedSubject}
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
                  <option value='SelectSubject'>Select Subject</option>
                  {this.state.subjects.map((sub) => (
                    <option value={sub} key={sub}>
                      {sub}
                    </option>
                  ))}
                </Select>
              </Col>
              <Col>
                <Button
                  onClick={async () => {
                    this.setState({ loadSpinner: true });
                    const { data } = await Axios.post(
                      `${process.env.REACT_APP_backUrl}/get/report`,
                      {
                        division: this.state.selectedDivision,
                        batch: this.state.selectedBatch,
                        subject: this.state.selectedSubject,
                      },
                    );
                    console.log(data);
                    this.setState({
                      tableData: data.newrows,
                      tableColumns: data.cols,
                      loadSpinner: false,
                    });
                  }}>
                  Search
                </Button>
              </Col>
            </Row>
          </div>
          <hr />
          <ToolkitProvider
            keyField='enrollment'
            data={this.state.tableData}
            columns={this.state.tableColumns}
            exportCSV={{
              fileName: `${this.state.selectedDivision}-${this.state.selectedBatch}-${this.state.selectedSubject}.csv`,
            }}>
            {(props) => (
              <div>
                <BootstrapTable
                  keyField='enrollment'
                  data={this.state.tableData}
                  columns={this.state.tableColumns}
                  key={`table`}
                  style={{ overflowY: "scroll" }}
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
