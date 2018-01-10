import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

export class DoughnutChart extends Component {
    render() {
        return <Doughnut data={this.props.data} />;
    }
}