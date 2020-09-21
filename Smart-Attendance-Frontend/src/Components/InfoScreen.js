/** @format */

import React, { Component } from "react";
import MyLine from "./MyLine";
import StudentCard from "./StudentCard";
import Axios from "axios";
import SpinnerComp from "./SpinnerComp";
import { Select } from "react-materialize";

class InfoScreen extends Component {
  state = {
    enrollment: [],
    gpData: {},
    selectedDivision: "H3",
    loadSpinner: false,
    searchEnrollment: "",
  };

  componentDidMount() {
    this.setState({ loadSpinner: true });
    Axios.get(
      `${process.env.REACT_APP_backUrl}/showattendance/allstudents`,
    ).then((enroll) => {
      console.log(enroll);
      this.setState({ enrollment: enroll.data, loadSpinner: false });
    });
  }

  spinnerFunction = () => {
    if (this.state.loadSpinner) {
      return <SpinnerComp />;
    }
  };

  handleToUpdate = (enroll, division) => {
    this.setState({ loadSpinner: true });
    console.log(division);
    Axios.get(
      `${process.env.REACT_APP_backUrl}/get/subjects/report-${division}`,
    ).then(({ data }) => {
      Axios.post(`${process.env.REACT_APP_backUrl}/showattendance/student`, {
        enrollment: enroll,
        subjects: data,
      }).then((graphData) => {
        this.setState({ gpData: graphData.data, loadSpinner: false });
      });
    });
  };

  render() {
    return (
      <div
        className='row'
        style={{
          margin: "0px",
          padding: "0px",
          background: "#535C68",
          overflowY: "hidden",
        }}>
        <div className='col s4 l4' style={{ padding: "0px" }}>
          <div style={{ height: "90vh", overflowY: "scroll" }}>
            <div>
              <div
                style={{
                  paddingLeft: "5%",
                  margin: "0px",
                  paddingRight: "5%",
                }}>
                <div className='col l3 white-text'>
                  <Select
                    style={{ color: "white" }}
                    onChange={(selected) => {
                      this.setState({
                        selectedDivision: selected.target.value,
                      });
                    }}
                    value={this.state.selectedDivision}
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
                    }}>
                    <option value='H3'>H3</option>
                    <option value='G3'>G3</option>
                  </Select>
                </div>
                <div className='col l9 ' style={{ marginTop: "27px" }}>
                  <input
                    type='text'
                    className=' searchb'
                    placeholder='Search'
                    style={{
                      boxShadow:
                        "inset 8px -11px 40px -16px rgba(112,113,128,1)",
                      background:
                        "linear-gradient(to left,  #d5dae5, #e4e6ed, #f2f2f6)",
                      borderRadius: "30px",
                      borderTopRightRadius: "15px",
                      borderBottomRightRadius: "15px",
                      borderTopLeftRadius: "15px",
                      borderBottomLeftRadius: "15px",
                      height: "35px",
                      paddingLeft: "8px",
                      width: "80%",
                    }}
                    onChange={(text) => {
                      this.setState({ searchEnrollment: text.target.value });
                      if (text.target.value === "") {
                        this.setState({ loadSpinner: true });
                        Axios.get(
                          `${process.env.REACT_APP_backUrl}/showattendance/allstudents`,
                        ).then((enroll) => {
                          console.log(enroll);
                          this.setState({
                            enrollment: enroll.data,
                            loadSpinner: false,
                          });
                        });
                      }
                    }}
                  />
                  <a
                    href='#!'
                    onClick={() => {
                      this.setState({ loadSpinner: true });
                      Axios.get(
                        `${process.env.REACT_APP_backUrl}/filter/enrollment/${this.state.searchEnrollment}`,
                      ).then((enroll) => {
                        if (enroll.data.length === 0) {
                          this.setState({
                            enrollment: enroll.data,
                            loadSpinner: false,
                          });
                          return alert("Not found");
                        }
                        this.setState({
                          enrollment: enroll.data,
                          loadSpinner: false,
                        });
                      });
                    }}>
                    <i
                      className='material-icons prefix searchi'
                      style={{
                        color: "#bbbec9",
                        fontSize: "28px",
                        marginLeft: "4px",
                        verticalAlign: "middle",
                      }}>
                      search
                    </i>
                  </a>
                </div>
              </div>
            </div>
            <div>
              <div
                className='col s12 l12 m12'
                style={{ borderTop: "dashed grey 1px", paddingTop: "10px" }}>
                {this.state.enrollment.map((enroll) => {
                  return (
                    <StudentCard
                      enrollment={enroll}
                      handleToUpdate={this.handleToUpdate}
                      key={enroll}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div style={{ position: "absolute", top: "50%", left: "50%" }}>
            {this.spinnerFunction()}
          </div>
        </div>
        <div
          className='col l8'
          style={{
            background:
              "linear-gradient(to bottom,  #d5dae5, #d5dae5, #e4e6ed, #f2f2f6)",
            height: "90vh",
          }}>
          <div className='section'></div>
          <div className='section'></div>
          <div className='section'></div>

          <MyLine
            lecture={this.state.gpData.lecture}
            percent={this.state.gpData.percent}
          />
        </div>
      </div>
    );
  }
}

export default InfoScreen;
