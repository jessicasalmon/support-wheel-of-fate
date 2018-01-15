import React, { Component } from 'react';

import getEngineers from '../requests/getEngineers.js';
import updateEngineers from '../requests/updateEngineers.js';

import PickEngineers from './PickEngineers';
import YesterdaysEngineers from './YesterdaysEngineers';
import TodaysEngineers from './TodaysEngineers';
import Header from './Header';

import filterEligibleEngineers from '../helpers/filterEligibleEngineers';
import todaysEngineers from '../helpers/selectTodaysEngineers';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
     shiftYesterday: [],
     shiftToday: [],
     engineers: []
    }
  };

  componentDidMount() {
    // set state to be same as in database
    getEngineers.then((data) => {
      this.setState({
        engineers: data.engineers,
        shiftToday: data.shiftToday,
        shiftYesterday: data.shiftYesterday
      })
    })
    .catch((err) => {
      // would usually alert the user to the error here
      console.error(err, 'error occured whilst fetching data');
    });
  }

  selectTodaysEngineers = () => {
    let eligibleEngineersList = filterEligibleEngineers(this.state.engineers, this.state.shiftToday);
    let updatedEngineers = todaysEngineers(eligibleEngineersList, this.state.engineers);

    this.setState({
      engineers: updatedEngineers.engineers,
      shiftToday: updatedEngineers.shiftToday,
      shiftYesterday: this.state.shiftToday
    }, () => {
      updateEngineers(this.state.engineers, this.state.shiftToday, this.state.shiftYesterday);
    });
  }

  render() {
    return (
      <div className="app-container w-100 mt0 white">
        <Header
          title='Shift Selector'
          PickEngineers={ PickEngineers }
          selectTodaysEngineers = { this.selectTodaysEngineers }
          />

        <TodaysEngineers shiftToday={this.state.shiftToday} />

        { this.state.shiftYesterday && this.state.shiftYesterday.length > 0 &&
          <YesterdaysEngineers shiftYesterday={this.state.shiftYesterday} />
        }
      </div>

    );
  }
}

export default App;
