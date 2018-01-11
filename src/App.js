import React, { Component } from 'react';
import './App.css';

class App extends Component {

  // rules:
  // 1. can't work if worked yesterday
  // 2. can't work if they are in shiftLimitReached array
  // 3. can't work if they worked already today

  constructor(props) {
    super(props);

    this.state = {
     shiftYesterday: ['Malinda Mannion', 'Myrtice Manfre', 'Madge Mcginty', 'Madlyn Moncada'], //expect to see no Ms
     shiftToday: [],
     engineers: [
       { name: 'Malinda Mannion', shiftsWorked: 0},
       { name: 'Bud Bjork', shiftsWorked: 0},
       { name: 'Jarrett Jett', shiftsWorked: 0},
       { name: 'Cassaundra Couts', shiftsWorked: 0},
       { name: 'Ashli Applebee', shiftsWorked: 0},
       { name: 'Myrtice Manfre', shiftsWorked: 0},
       { name: 'Eugenie Etherton', shiftsWorked: 0},
       { name: 'Madge Mcginty', shiftsWorked: 0},
       { name: 'Assunta Austin', shiftsWorked: 0},
       { name: 'Madlyn Moncada', shiftsWorked: 0}
     ]
    }
  }

   eligibleEngineers = () => {
    const allEngineers = this.state.engineers;

    const meetsCriteria = (engineer) => {
      const rules = !this.state.shiftYesterday.includes(engineer.name) && engineer.shiftsWorked < 2;
      return rules;
    }

    return allEngineers.filter(meetsCriteria);
  }

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

    // update the shifts for morning and afernoon
    if (shifts.morning !== '' && shifts.afternoon !== '') {
      Object.keys(engineersObj).forEach((key) => {
        if(engineersObj[key].name === shifts.morning) {
          engineersObj[key].shiftsWorked += 1;
        }
        if (engineersObj[key].name === shifts.afternoon) {
          engineersObj[key].shiftsWorked += 1;
        }
      });
    };

    console.log(engineersObj, 'my eng obj');

    let shiftsTodayCopy = [];
    shiftsTodayCopy.push(shifts.morning);
    shiftsTodayCopy.push(shifts.afternoon);

    this.setState({
      engineers: engineersObj,
      shiftToday: shiftsTodayCopy
    });

    return shifts;
  }

  render() {
    console.log(this.state, 'state');
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
