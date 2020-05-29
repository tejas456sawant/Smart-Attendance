/** @format */

import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
class StudentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      StudentName: "",
      StudentImage:
        "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",
      StudentDivision: "",
    };
  }

  componentDidMount() {
    Axios.get(
      `${process.env.REACT_APP_backUrl}/users/getInfo/enroll/${this.props.enrollment}`,
    ).then((userInfo) => {
      const { StudentName, StudentImage, StudentDivision } = userInfo.data;
      this.setState({
        StudentName,
        StudentImage,
        StudentDivision,
      });
    });
  }

  render() {
    var handleToUpdate = this.props.handleToUpdate;
    return (
      <div style={{ padding: "4px" }}>
        <ul
          className='collection Student'
          style={{
            margin: "2px",
            borderRadius: " 12px 12px 12px 12px",
            border: "none",
          }}>
          <li
            className='collection-item avatar '
            style={{
              background:
                " linear-gradient(to left top, #708294, #7d8fa1, #8a9cae, #97a9bb, #a4b6c9)",
            }}>
            <img src={this.state.StudentImage} alt='....' className='circle' />
            <div className='left white-text'>
              <span
                style={{ fontSize: "14px", opacity: "0.7" }}
                className='white-text left'>
                {this.state.StudentName}
              </span>
              <br />
              <span>{this.props.enrollment}</span>
              <div
                className='btn-small waves-effect waves-light cyan '
                style={{
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  margin: "10px",
                  borderRadius: "10px",
                }}
                onClick={() =>
                  handleToUpdate(
                    this.props.enrollment,
                    this.state.StudentDivision,
                  )
                }>
                Attendance
              </div>
              <Link
                to={`/AttendanceDetail/${this.props.enrollment}-${this.state.StudentDivision}`}>
                <div
                  className='btn-small waves-effect waves-light red lighten-2'
                  style={{
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    borderRadius: "10px",
                  }}>
                  Details
                </div>
              </Link>
            </div>
            <Link
              className='secondary-content'
              to={`/edit/${this.props.enrollment}`}>
              <i className='material-icons' style={{ color: "white" }}>
                create
              </i>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default StudentCard;
