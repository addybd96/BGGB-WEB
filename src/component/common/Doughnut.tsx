import React, { Component } from 'react'
import Chart from "chart.js";
import classes from "./LineGraph.module.css";

export default class Doughnut extends Component<any, any> {

    constructor(props:any)
    {
        super(props)
        this.state = {}
    }

    
    chartRef:any = React.createRef();
    
    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        this.setState({myChartRef})
    }

    static getDerivedStateFromProps(props:any, state:any)
    {
        if(props.data && state.myChartRef)
        {
            new Chart(state.myChartRef, {
                type: props.type?props.type:"doughnut",
                data: props.data,
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
    }

    render() {
        return (
            <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
        )
    }
}