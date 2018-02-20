import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as CSV from 'csv-string';
import * as _ from 'lodash';
// import { Bar, Pie, Doughnut } from 'react-chartjs-2';
// import { BarChart } from './components/BarChart';
// import { DoughnutChart } from './components/DoughnutChart';
// import { List } from './components/List';
import UserBallot from './components/Ballot/UserBallot';

const scoring = [15, 12, 10, 8, 6, 5, 4, 3, 2, 1];


class App extends Component {
  render() {
    // let titles = this.getTitles();
    // let anticipated = this.getAnticipated();
    // let surprises = this.getSurprises();
    // let oldGames = this.getOldGames();
    // let disappointments = this.getDisappointments();
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {/* <BarChart data={this.getData(titles)} /> */}
        {/* <DoughnutChart data={this.getData(titles)} /> */}
        {/* <DoughnutChart data={this.getData(surprises)} /> */}
        {/* <DoughnutChart data={this.getData(disappointments)} /> */}
        {/* <DoughnutChart data={this.getData(oldGames)} /> */}
        {/* <DoughnutChart data={this.getData(anticipated)} /> */}
        {/* <List titles={titles} />
        <List titles={surprises} />
        <List titles={disappointments} />
        <List titles={oldGames} />
        <List titles={anticipated} /> */}
        <UserBallot />
        
      </div>
    );
  }

  getData(titles) {
    let data = {
      labels:[],
      datasets:[{data: [], backgroundColor: []}]
    };

    data.labels = _.map(titles, 'name');
    data.datasets[0].data = _.map(titles, 'score');
    data.datasets[0].backgroundColor = _.map(titles, 'backgroundColor');

    return data;
  }

  getDisappointments() {
    let csvString = "";

    return this.tallyVotes(csvString);
  }

  getOldGames() {
    let csvString = "";

    return this.tallyVotes(csvString);
  }

  getTitles() {
    let csvString = "";

    return this.tallyVotes(csvString);
  }

  getAnticipated() {
    let csvString = "";

    return this.tallyVotes(csvString);
  }

  getSurprises() {
    let csvString = "";

    return this.tallyVotes(csvString);
  }

  tallyVotes(csvString) {
    let votes = [];
    let titles = [];
    let arr = CSV.parse(csvString);
    _.forEach(arr, (result) => { 
      votes.push(new Vote(result));
    });
    
    _.forEach(votes, (vote) => {
        _.forEach(vote.results, (result, index) => {
          if (result !== "") {
            let title = _.find(titles, (title) => { return title.name.trim().toLowerCase() === result.trim().toLowerCase(); });
            
            if (!title) {
              title = new Score(result);
              titles.push(title);
            }
    
            title.score += this.getScore(index);
            title.totalVotes += 1; 
            title.firstPlaceVotes += index !== 0 ? 0 : 1;
            title.backgroundColor = this.getRandomColor();
          }
        });
    });

    return _.orderBy(titles, ['score'], ['desc']);
  }

  getScore(index) {
    return scoring[index];
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

class Vote {
  constructor(result) {
    this.name = result[0].trim();
    this.results = _.drop(result);
  }
}

class Score {
  constructor(title) {
    this.name = title.trim();
    this.score = 0;
    this.firstPlaceVotes = 0;
    this.totalVotes = 0;
  }
}

export default App;
