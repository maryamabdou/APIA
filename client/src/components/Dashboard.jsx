import React, { Component } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import "./Dashboard.css";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class LineChart extends Component {
  render() {
    const { data } = this.props;

    const dataPoints = data.message.map((row) => ({
      x: row[0],
      y: row[6],
    }));

    const options = {
      animationEnabled: true,
      exportEnabled: true,
      zoomEnabled: true,
      backgroundColor: "#eaa69080",
      theme: "light1", // "light1", "dark1", "dark2"
      title: {
        text: "Interview Rate",
      },
      axisY: {
        title: "Scores",
        suffix: "",
      },
      axisX: {
        title: "Id",
        prefix: "",
        interval: 1,
      },
      data: [
        {
          type: "line", //spline //pie //column //area //bar
          toolTipContent: "Id {x}: Score {y}",
          dataPoints: dataPoints,
        },
      ],
    };
    return (
      <div className="chart-container">
        <CanvasJSChart options={options} />
      </div>
    );
  }
}
export default LineChart;
