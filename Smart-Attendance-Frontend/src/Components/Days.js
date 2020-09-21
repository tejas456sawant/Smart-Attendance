/** @format */

import React, { Component } from "react";
import DailyCard from "./DailyCard";
import axios from "axios";
import SpinnerComp from "./SpinnerComp";
import { Redirect } from "react-router-dom";
import { DatePicker, Select, Button } from "react-materialize";
import Axios from "axios";
import firebase from "firebase/app";
import "firebase/auth";

class Days extends Component {
  state = {
    data: [],
    loadSpinner: false,
    startDate: "",
    endDate: "",
    selectedDivision: "H3",
    divisions: [],
  };

  componentDidMount() {
    this.setState({ loadSpinner: true });
    axios
      .get(process.env.REACT_APP_backUrl + "/attendance/getAttendanceDate")
      .then((res) => {
        this.setState({ data: res.data });
        this.setState({ loadSpinner: false });
      });
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

  isLoggedIn = () => {
    if (firebase.auth().currentUser === null) return <Redirect to='/login' />;
  };

  render() {
    return (
      <div>
        <div
          className='row'
          style={{
            marginBottom: "0px",
            background:
              "linear-gradient(to top,  #d5dae5, #d5dae5, #e4e6ed, #f2f2f6)",
            margin: "0px",
            paddingLeft: "20px",
          }}>
          <div
            className='col l4'
            style={{ margin: "0px", padding: "9px", display: "block" }}>
            <div
              className='left'
              style={{ height: "100%", paddingTop: "18px" }}>
              From Date:
            </div>
            <DatePicker
              id='DatePicker-1'
              options={{
                autoClose: false,
                container: null,
                defaultDate: null,
                disableDayFn: null,
                disableWeekends: false,
                events: [],
                firstDay: 0,
                format: "mmm dd, yyyy",
                i18n: {
                  cancel: "Cancel",
                  clear: "Clear",
                  done: "Ok",
                  months: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ],
                  monthsShort: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ],
                  nextMonth: "›",
                  previousMonth: "‹",
                  weekdays: [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ],
                  weekdaysAbbrev: ["S", "M", "T", "W", "T", "F", "S"],
                  weekdaysShort: [
                    "Sun",
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                  ],
                },
                isRTL: false,
                maxDate: null,
                minDate: null,
                onClose: null,
                onDraw: null,
                onOpen: null,
                onSelect: (value) => {
                  this.setState({
                    startDate:
                      value.getFullYear() +
                      "-" +
                      (value.getMonth() + 1) +
                      "-" +
                      value.getDate(),
                  });
                  document.body.style.overflow = "scroll";
                },
                parse: null,
                setDefaultDate: false,
                showClearBtn: false,
                showDaysInNextAndPreviousMonths: false,
                showMonthAfterYear: false,
                yearRange: 10,
              }}
              value={this.state.startDate}
              style={{ height: "30px" }}
              readOnly
            />
          </div>
          <div
            className='col l4'
            style={{ margin: "0px", padding: "9px", display: "block" }}>
            <div
              className='left'
              style={{ height: "100%", paddingTop: "18px" }}>
              To :
            </div>
            <DatePicker
              id='DatePicker-2'
              options={{
                autoClose: false,
                container: null,
                defaultDate: null,
                disableDayFn: null,
                disableWeekends: false,
                events: [],
                firstDay: 0,
                format: "mmm dd, yyyy",
                i18n: {
                  cancel: "Cancel",
                  clear: "Clear",
                  done: "Ok",
                  months: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ],
                  monthsShort: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ],
                  nextMonth: "›",
                  previousMonth: "‹",
                  weekdays: [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ],
                  weekdaysAbbrev: ["S", "M", "T", "W", "T", "F", "S"],
                  weekdaysShort: [
                    "Sun",
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                  ],
                },
                isRTL: false,
                maxDate: null,
                minDate: null,
                onClose: null,
                onDraw: null,
                onOpen: null,
                onSelect: (value) => {
                  this.setState({
                    endDate:
                      value.getFullYear() +
                      "-" +
                      (value.getMonth() + 1) +
                      "-" +
                      value.getDate(),
                  });
                  document.body.style.overflow = "scroll";
                },
                parse: null,
                setDefaultDate: false,
                showClearBtn: false,
                showDaysInNextAndPreviousMonths: false,
                showMonthAfterYear: false,
                yearRange: 10,
              }}
              value={this.state.endDate}
              style={{ height: "30px" }}
              readOnly
            />
          </div>
          <div className='col l4' style={{ paddingTop: "2px" }}>
            <Select
              style={{ width: "100%" }}
              label='Select Division'
              options={{
                classes: "",
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
              value={this.state.selectedDivision}
              onChange={(event) => {
                this.setState({ selectedDivision: event.target.value });
              }}>
              {this.state.divisions.map((division) => (
                <option value={division} key={division}>
                  {division}
                </option>
              ))}
            </Select>
            <div style={{ height: "100%", paddingTop: "18px" }}>
              <Button
                onClick={() => {
                  if (this.state.startDate === "") {
                    return alert("Select start date");
                  }
                  if (this.state.endDate === "") {
                    return alert("Select end date");
                  }
                  if (
                    this.state.startDate !== "" &&
                    this.state.endDate !== ""
                  ) {
                    this.setState({ loadSpinner: true });
                    Axios.post(`${process.env.REACT_APP_backUrl}/filter/date`, {
                      startDate: this.state.startDate,
                      endDate: this.state.endDate,
                      selectedDivision: this.state.selectedDivision,
                    }).then(({ data }) => {
                      if (data.length === 0) {
                        this.setState({ loadSpinner: false });
                        this.setState({ data });
                        return alert("Not found");
                      }
                      this.setState({ data });
                      this.setState({ loadSpinner: false });
                      document.body.style.overflow = "scroll";
                    });
                  }
                }}>
                Search
              </Button>
            </div>
          </div>
        </div>
        <div
          className='conatiner row'
          style={{
            paddingTop: "0px",
            background:
              "linear-gradient(to bottom,  #d5dae5, #d5dae5, #e4e6ed, #f2f2f6)",
          }}>
          {this.state.data.map((data1) => {
            return <DailyCard title={data1.date} key={data1.date} />;
          })}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              zIndex: 100000,
            }}>
            {this.spinnerFunction()}
          </div>
        </div>
      </div>
    );
  }
}

export default Days;
