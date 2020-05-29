/** @format */

import React from "react";
import { Bar } from "react-chartjs-2";

const MyLine = (props) => {
  const data = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 500);
    gradient.addColorStop(0, "rgba(0,155,255,1)");
    gradient.addColorStop(0.4, "rgba(0,206,255,0.4)");
    gradient.addColorStop(1, "rgba(0,194,255,0.1)");

    const gradient1 = ctx.createLinearGradient(0, 0, 0, 500);
    gradient1.addColorStop(0, "rgba(246,81,112,1)");
    gradient1.addColorStop(0.4, " rgba(249,99,144,0.4)");
    gradient1.addColorStop(1, "rgba(255,175,189,0.2553396358543417)");

    return {
      labels: props.lecture,
      datasets: [
        {
          label: "Rainfall",
          backgroundColor: gradient,
          borderColor: "rgba(0,155,255,1)",
          borderWidth: 1,
          hoverBackgroundColor: gradient1,
          hoverBorderColor: "rgba(246,81,112,1)",
          data: props.percent,
        },
      ],
    };
  };
  var options = {
    title: {
      display: true,
      text: "Percentage of Attendance",
      fontSize: 20,
    },
    legend: {
      display: false,
      position: "right",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            max: 100,
          },
        },
      ],
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MyLine;
