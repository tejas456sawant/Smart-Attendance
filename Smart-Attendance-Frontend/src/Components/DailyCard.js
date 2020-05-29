/** @format */

import React, { Component } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import SpinnerComp from "./SpinnerComp";
import { Link } from "react-router-dom";

class DailyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attData: [],
      lab: [],
      datar: [],
      datara: [],
      loadSpinner: false,
    };
  }

  componentDidMount() {
    this.setState({ loadSpinner: true });
    axios
      .get(
        process.env.REACT_APP_backUrl +
          "/attendance/getAttendanceData/" +
          this.props.title,
      )
      .then((res) => {
        var dataLable = [];
        var dataData = [];
        var dataDataa = [];
        this.setState({ attData: res.data });
        res.data.map((resp) => {
          dataLable.push(resp.lecture);
          dataData.push(resp.percent);
          dataDataa.push(100 - resp.percent);
          return resp;
        });
        this.setState({ lab: dataLable, datar: dataData, datara: dataDataa });
        dataLable = [];
        dataData = [];
        dataDataa = [];
        this.setState({ loadSpinner: false });
      });
  }

  spinnerFunction = () => {
    if (this.state.loadSpinner) {
      return <SpinnerComp />;
    }
  };

  render() {
    return (
      <div className='col l4'>
        <div className='card'>
          <div className='card-image waves-effect waves-block waves-light'>
            <Bar
              data={{
                labels: this.state.lab,
                datasets: [
                  {
                    label: "Present",
                    backgroundColor: "rgba(75,192,192,0.7)",
                    borderColor: "rgba(0,0,0,0.5)",
                    borderWidth: 1,
                    data: this.state.datar,
                  },
                  {
                    label: "Absent",
                    backgroundColor: "rgba(75,192,0,0.7)",
                    borderColor: "rgba(0,0,0,0.5)",
                    borderWidth: 1,
                    data: this.state.datara,
                  },
                ],
              }}
              options={{
                title: {
                  display: true,
                  text: "   ",
                  fontSize: 5,
                },
                legend: {
                  display: true,
                  position: "bottom",
                },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                        min: 0,
                        max: 100,
                      },
                    },
                  ],
                },
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              top: "40%",
              left: "40%",
              zIndex: 100000,
            }}>
            {this.spinnerFunction()}
          </div>
          <div className='card-content'>
            <span className='card-title activator grey-text text-darken-4'>
              {this.props.title}
              <i className='material-icons right'>more_vert</i>
            </span>
          </div>
          <div className='card-reveal'>
            <span className='card-title grey-text text-darken-4'>
              {this.props.title}
              <i className='material-icons right'>close</i>
            </span>
            {this.state.attData.map((res) => {
              var sub = "/show/" + res.lecture + ":" + this.props.title;
              return (
                <blockquote key={res.lecture + res.percent}>
                  <Link to={sub}>
                    {res.lecture} : {res.percent}%
                  </Link>
                </blockquote>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default DailyCard;
