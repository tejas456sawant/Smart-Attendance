/** @format */

import React from "react";
import "./App.css";
import Navbar from "./Components/navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import RegisterStudent from "./Components/RegisterStudent";
import AttendanceTable from "./Components/TimeTable";
import ShowAttendace from "./Components/ShowAttendance";
import Days from "./Components/Days.js";
import Login from "./Components/Login";
import InfoScreen from "./Components/InfoScreen";
import EditInfo from "./Components/EditInfo";
import GenerateReports from "./Components/GenerateReports";
import StudentAttendance from "./Components/StudentAttendance";
import AddNew from "./Components/AddNew";
import Queries from "./Components/Queries";

//Server Url REACT_APP_backUrl=http://35.188.34.4:3000

const App = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar />
        <Switch>
          <Route path='/register' component={RegisterStudent} />
          <Route
            path='/AttendanceDetail/:endiv'
            component={StudentAttendance}
          />
          <Route path='/New' component={AddNew} />
          <Route path='/studentInfo' component={InfoScreen} />
          <Route path='/timetable' component={AttendanceTable} />
          <Route path='/generate' component={GenerateReports} />
          <Route path='/show/:subDate' component={ShowAttendace} />
          <Route path='/login' component={Login} />
          <Route path='/complaint' component={Queries} />
          <Route path='/edit/:enroll' component={EditInfo} />
          <Route path='*' component={Days} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
