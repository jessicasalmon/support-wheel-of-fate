import React, { Component } from 'react';
import getEngineers from '../requests/getEngineers.js';
import updateEngineers from '../requests/updateEngineers.js';

import morning from '../assets/sunrise.svg';
import afternoon from '../assets/sunset.svg';

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
          <div
          onClick={() => this.selectTodaysEngineers()}
          className="grow f4 pv3 pa3 bg-black-30 tc pointer br3 ttu b">
            Pick Engineers
          </div>
        </section>

        <section className="mt5-ns mt2 flex flex-column flex-row-ns">
          <div className="w-50-ns flex flex-column items-center">
            <header className="f2 pv3">AM</header>
              <img className={`${new Date().getHours() >= 8 & new Date().getHours() < 13 ? 'animation' : ''} w-50`} src={morning}></img>
            <p className="f3">{this.state.shiftToday[0]}</p>
          </div>
          <div className="w-50-ns flex flex-column items-center">
            <header className="f2 pv3">PM</header>
              <img className={`${new Date().getHours() >= 13 ? 'animation' : ''} w-50`} src={afternoon}></img>
            <p className="f3">{this.state.shiftToday[1]}</p>
          </div>
        </section>
        {
          this.state.shiftYesterday && this.state.shiftYesterday.length > 0 &&
          <section className="mt5-ns mt2 flex-column dn db-ns">
          <div className="flex items-center justify-center">
            <h2 className="w-third pa3 br3 bg-black-30 tc">Yesterdays Shift</h2>
          </div>
          <div className="flex items-center justify-center">
            <p className="w-third tr pr3 flex items-center justify-end"><span className="f4 b">AM &nbsp;</span>{ this.state.shiftYesterday[0]}</p>
            <p className="w-third pl3 flex items-center"><span className="f4 b">PM &nbsp;</span>{ this.state.shiftYesterday[1]}</p>
          </div>
          </section>
        }
      </div>

    );
  }
}

export default App;
