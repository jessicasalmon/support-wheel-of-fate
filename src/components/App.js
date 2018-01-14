import React, { Component } from 'react';

import getEngineers from '../requests/getEngineers.js';
import updateEngineers from '../requests/updateEngineers.js';

import PickEngineers from './PickEngineers';
import YesterdaysEngineers from './YesterdaysEngineers';
import TodaysEngineers from './TodaysEngineers';

// import selectTodaysEngineers from '../helpers/selectTodaysEngineers';
import filterEligibleEngineers from '../helpers/filterEligibleEngineers';

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

  selectTodaysEngineers = () => {
    let eligibleEngineersList = filterEligibleEngineers(this.state.engineers, this.state.shiftToday);

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
      shiftToday: shiftsTodayCopy,
      shiftYesterday: this.state.shiftToday
    }, () => {
      this.updateDBEngineers();
    });
  }

  updateDBEngineers = () => {
    let updatedEngineers = this.state.engineers;
    updateEngineers(updatedEngineers);
  }

  render() {
    console.log(this.state, 'engineers in state')
    return (
      <div className="app-container w-100 mt0 white">
        <section className="flex flex-column flex-row-ns pa3 items-center justify-between">
          <h1 className="f3 mv0-ns ttu bb bw1 b--white">Shift Selector</h1>
          <PickEngineers selectTodaysEngineers = {this.selectTodaysEngineers} />
        </section>

        <TodaysEngineers shiftToday={this.state.shiftToday} />

        { this.state.shiftYesterday && this.state.shiftYesterday.length > 0 &&
          <YesterdaysEngineers shiftYesterday={this.state.shiftYesterday} />
        }
      </div>

    );
  }
}

export default App;
