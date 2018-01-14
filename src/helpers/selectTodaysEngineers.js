const selectTodaysEngineers = (engineers) => {

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

export default selectTodaysEngineers;
