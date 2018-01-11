import React, { Component } from 'react';
import './App.css';
import getEngineers from './requests/getEngineers.js';
import updateEngineers from './requests/updateEngineers.js';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
     shiftYesterday: [], // remeber to sync up with db & implement logic
     shiftToday: [], // ""
     engineers: []
    }
  };

  componentDidMount() {
    // set state to be same as in database
    getEngineers.then((data) => {
      this.setState({
        engineers: data
      });
      console.log(this.state.engineers, 'my state engs')
    })
    .catch((err) => {
      console.log(err, 'error occured whilst fetching data')
    });
  }

  eligibleEngineers = () => {
    const allEngineers = this.state.engineers;

    const meetsCriteria = (engineer) => {
      const rules = !this.state.shiftYesterday.includes(engineer.name) && engineer.shifts_worked < 2;
      return rules;
    }
    
    return allEngineers.filter(meetsCriteria);
  };

  selectTodaysEngineers = () => {
    const eligibleEngineersList = this.eligibleEngineers();
    let engineers = eligibleEngineersList.map(engineer => {
      return engineer.name
    });
    let engineersObj = this.state.engineers;

    let shifts = {
      morning: null,
      afternoon: null
    }

    let selectFirstEngineer = engineers[Math.floor(Math.random() * engineers.length)]
    shifts.morning = selectFirstEngineer;

    if(shifts.morning) {
      // remove that key from the engineers array
      const morningEng = engineers.indexOf(shifts.morning);
      if (morningEng !== -1) {
        engineers.splice(morningEng, 1)
      }
      // then run the function again and assign to shifts.afernoon
      let selectSecondEngineer = engineers[Math.floor(Math.random() * engineers.length)];
      shifts.afternoon = selectSecondEngineer;
    }

    // update the shifts for morning and afternoon
    if (shifts.morning !== '' && shifts.afternoon !== '') {
      Object.keys(engineersObj).forEach((key) => {
        if(engineersObj[key].name === shifts.morning) {
          engineersObj[key].shifts_worked += 1;
        }
        if (engineersObj[key].name === shifts.afternoon) {
          engineersObj[key].shifts_worked += 1;
        }
      });
    };


    let shiftsTodayCopy = [];
    shiftsTodayCopy.push(shifts.morning);
    shiftsTodayCopy.push(shifts.afternoon);

    console.log(engineersObj, 'my eng obj. These items should go in the state after');
    // console.log(shiftsTodayCopy, 'shifts today copy');

    this.setState({
      engineers: engineersObj,
      shiftToday: shiftsTodayCopy
    }, () => {
      this.updateDBEngineers();
    });
  }

  updateDBEngineers = () => {
    console.log('it updated');

    let myParam = this.state.engineers;
    console.log(myParam, 'my state after updating it')
    updateEngineers(myParam);
  }

  render() {
    console.log(this.state.engineers, 'engineers in state')
    return (
      <div className="app-container">
        <p>{this.state.shiftToday[0]}</p>
        <p>{this.state.shiftToday[1]}</p>
        <div
        onClick={() => this.selectTodaysEngineers()}
        style={{backgroundColor: "pink", padding: "1em", width: "50%"}}>Assign Engineers</div>
      </div>
    );
  }
}

export default App;
