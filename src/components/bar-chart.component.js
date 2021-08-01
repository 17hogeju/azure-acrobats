import React, { Component } from "react";
import { Bar } from "react-chartjs-2";


class BarChart extends Component {

    render() {
        return (
            <div>
                <Bar
                    height={600} width={1000}
                    data={
                        {
                            labels: this.props.labels,
                            datasets: [
                                {
                                    label: false,
                                    backgroundColor: 'rgba(75,192,192,1)',
                                    borderColor: 'rgba(0,0,0,1)',
                                    borderWidth: 2,
                                    data: this.props.data
                                }
                            ]
                        }
                    }
                    options={{
                        plugins: {
                            legend: {
                                display: false,
                            },
                            title: {
                                display: true,
                                text: this.props.title,
                                font: {
                                    size: 30,
                                }
                            }
                        },

                        scales: {
                            y: {
                                title: {
                                    display: true,
                                    text: this.props.yaxis,
                                    font: {
                                        size: 25,
                                    }
                                }
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: this.props.xaxis,
                                    font: {
                                        size: 25,
                                    }
                                }
                            }
                        }
                    }} />
            </div>
        );
    }
}

export default BarChart;