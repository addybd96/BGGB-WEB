import React, { Component } from 'react'
import Chart from "chart.js";
import classes from "./LineGraph.module.css";

export default class LineGraph extends Component<any, any> {
    chartRef: any = React.createRef();

    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");

        new Chart(myChartRef, {
            type: "line",
            data: this.props.data,
            // {
            //     //Bring in data
            //     labels: ["Jan", "Feb", "March"],
            //     datasets: [
            //         {
            //             label: "Sales",
            //             data: [86, 67, 91],
            //         }
            //     ]
            // },
            options: {
                //Customize chart options
            }
        });
    }
    render() {
        return (
            <div className={classes.graphContainer}>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}