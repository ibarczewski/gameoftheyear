import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

export class BarChart extends Component {
    render() {
        return <Bar data={this.props.data} />;
    }
}