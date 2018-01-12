import React, { Component } from 'react';
import '../App.css';
import getEngineers from '../requests/getEngineers.js';
import updateEngineers from '../requests/updateEngineers.js';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
     shiftYesterday: [], // remeber to sync up with db
     shiftToday: [],
     engineers: []
    }
  };

  componentDidMount() {
    // set state to be same as in database
    getEngineers.then((data) => {
      this.setState({
        engineers: data
      })
    })
    .catch((err) => {
      console.log(err, 'error occured whilst fetching data')
    });
  }

  eligibleEngineers = (allEngineers) => {
    const newShiftYesterday = this.state.shiftToday;

    let meetsCriteria;
    // if some engineers worked less than one shift, select from that pool
    if (allEngineers.some(eng => eng.shifts_worked < 1)) {
      meetsCriteria = (engineer) => {
        const rules = !newShiftYesterday.includes(engineer.name) && engineer.shifts_worked < 1;
        return rules;
      }
    } // all engineers reached the 2 shift limit, reset the shifts_worked count
    else if(allEngineers.every(eng => eng.shifts_worked === 2)) {
      return allEngineers.map(engineer => {
        engineer.shifts_worked = 0;
        return engineer;
      });
    }
    else {
      meetsCriteria = (engineer) => {
        const rules = !newShiftYesterday.includes(engineer.name) && engineer.shifts_worked < 2;
        return rules;
      }
    }

    return allEngineers.filter(meetsCriteria);
  };

  selectTodaysEngineers = () => {
    let eligibleEngineersList = this.eligibleEngineers(this.state.engineers);

    let engineers = eligibleEngineersList.map(engineer => {
      return engineer.name
    });

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
      // // then run the function again and assign to shifts.afernoon
      let selectSecondEngineer = engineers[Math.floor(Math.random() * engineers.length)];
      shifts.afternoon = selectSecondEngineer;
    }

    let engineersObj = this.state.engineers.slice(0);

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


    this.setState({
      engineers: engineersObj,
      shiftToday: shiftsTodayCopy
    }, () => {
      this.updateDBEngineers();
    });
  }

  updateDBEngineers = () => {
    let updatedEngineers = this.state.engineers;
    updateEngineers(updatedEngineers);
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
