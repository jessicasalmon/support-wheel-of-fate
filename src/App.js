import React, { Component } from 'react';
import './App.css';

class App extends Component {
  // tests can set the state to various things and then check that the function DOES NOT return those values
  constructor(props) {

    super(props);

    this.state = {
     shiftYesterday: ['Malinda Mannion', 'Myrtice Manfre', 'Madge Mcginty', 'Madlyn Moncada'], //expect to see no Ms
     shiftToday: [],
     // shiftLimitReached: [],
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

  render() {
    // done:
    // 1. can't work if worked yesterday
    // 2. can't work if they are in shiftLimitReached array
    // refine pool of eligible engineers based on the rules
    // 3. can't work if they worked already today (introduce second person selection here)

// TODO make sure the funcion only runs once a day
// TODO at the beginning of the function, push those who arein worked todayc state into worked Yesterday state (e.g. only if it's length is two)


    const eligibleEngineers = () => {
      const allEngineers = this.state.engineers;

      const meetsCriteria = (engineer) => {
        const rules = !this.state.shiftYesterday.includes(engineer.name) && engineer.shiftsWorked < 2;
        return rules;
      }

      console.log(allEngineers.filter(meetsCriteria), 'eligible engineers');
      return allEngineers.filter(meetsCriteria);
    }

    const selectTodaysEngineers = () => {
      const engineersObj = eligibleEngineers();
      const engineers = engineersObj.map(engineer => {
        return engineer.name
      });
      const updatedEngineersObj = this.state.engineers;

      const shifts = {
        morningEngineer: null,
        afternoonEngineer: null
      }

      shifts.morningEngineer = engineers[Math.floor(Math.random() * engineers.length)];
      let randomEngineer = engineers[Math.floor(Math.random() * engineers.length)];
      randomEngineer !== shifts.morningEngineer ? shifts.afternoonEngineer = randomEngineer : randomEngineer;


      if (shifts.morningEngineer !== '') {
        Object.keys(updatedEngineersObj).forEach((key) => {
          if(updatedEngineersObj[key].name === shifts.morningEngineer) {
            updatedEngineersObj[key].shiftsWorked += 1;
          }
        });
      };

      console.log(updatedEngineersObj, 'updated obj after pushing new count')

      console.log(shifts, 'shifts');
      return shifts; //perhaps return an object with moring/ evening key

    }

    return (

      <div className="app-container">
        <p>testing</p>
        {console.log(selectTodaysEngineers(), 'called')}
        {console.log(selectTodaysEngineers().morningEngineer, 'called')}
        {console.log(selectTodaysEngineers().afternoonEngineer, 'called')}
        <p></p>
      </div>
    );
  }
}

export default App;
