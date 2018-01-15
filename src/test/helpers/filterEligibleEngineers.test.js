import filterEligibleEngineers from '../../helpers/filterEligibleEngineers';

describe('filterEligibleEngineers function', () =>{

  test('if not all engineers have worked 1 shift, only engineers who have worked 0 shifts will be returned ', () => {
    const engineers = [
      {id: 1, name: "Malinda Mannion", shifts_worked: 0},
      {id: 2, name: "Bud Bjork", shifts_worked: 0},
      {id: 3, name: "Jarrett Jett", shifts_worked: 1},
      {id: 4, name: "Cassaundra Couts", shifts_worked: 0},
      {id: 5, name: "Ashli Applebee", shifts_worked: 1},
      {id: 6, name: "Myrtice Manfre", shifts_worked: 1},
      {id: 7, name: "Eugenie Etherton", shifts_worked: 1},
      {id: 8, name: "Madge Mcginty", shifts_worked: 1},
      {id: 9, name: "Assunta Austin", shifts_worked: 0},
      {id: 10, name: "Madlyn Moncada", shifts_worked: 1}
    ];
    const shiftToday = ["Madge Mcginty", "Eugenie Etherton"]
    let eligibleEngineers = filterEligibleEngineers(engineers, shiftToday);

    const expected = [
      { id: 1, name: 'Malinda Mannion', shifts_worked: 0 },
      { id: 2, name: 'Bud Bjork', shifts_worked: 0 },
      { id: 4, name: 'Cassaundra Couts', shifts_worked: 0 },
      { id: 9, name: 'Assunta Austin', shifts_worked: 0 }
    ];

    expect(eligibleEngineers).toEqual(expect.arrayContaining(expected));
  });

  test('if not all engineers have worked 2 shifts, only engineers who have worked 1 shifts will be returned ', () => {
    const engineers = [
      {id: 1, name: "Malinda Mannion", shifts_worked: 2},
      {id: 2, name: "Bud Bjork", shifts_worked: 2},
      {id: 3, name: "Jarrett Jett", shifts_worked: 1},
      {id: 4, name: "Cassaundra Couts", shifts_worked: 1},
      {id: 5, name: "Ashli Applebee", shifts_worked: 1},
      {id: 6, name: "Myrtice Manfre", shifts_worked: 1},
      {id: 7, name: "Eugenie Etherton", shifts_worked: 2},
      {id: 8, name: "Madge Mcginty", shifts_worked: 2},
      {id: 9, name: "Assunta Austin", shifts_worked: 2},
      {id: 10, name: "Madlyn Moncada", shifts_worked: 2}
    ];
    const shiftToday = ["Madge Mcginty", "Eugenie Etherton"]
    let eligibleEngineers = filterEligibleEngineers(engineers, shiftToday);

    const expected = [
      {id: 3, name: "Jarrett Jett", shifts_worked: 1},
      {id: 4, name: "Cassaundra Couts", shifts_worked: 1},
      {id: 5, name: "Ashli Applebee", shifts_worked: 1},
      {id: 6, name: "Myrtice Manfre", shifts_worked: 1},
    ];

    expect(eligibleEngineers).toEqual(expect.arrayContaining(expected));
  });

  test('if all engineers have worked 2 shifts, shifts_worked counts will be reset to 0 ', () => {
    const engineers = [
      {id: 1, name: "Malinda Mannion", shifts_worked: 2},
      {id: 2, name: "Bud Bjork", shifts_worked: 2},
      {id: 3, name: "Jarrett Jett", shifts_worked: 2},
      {id: 4, name: "Cassaundra Couts", shifts_worked: 2},
      {id: 5, name: "Ashli Applebee", shifts_worked: 2},
      {id: 6, name: "Myrtice Manfre", shifts_worked: 2},
      {id: 7, name: "Eugenie Etherton", shifts_worked: 2},
      {id: 8, name: "Madge Mcginty", shifts_worked: 2},
      {id: 9, name: "Assunta Austin", shifts_worked: 2},
      {id: 10, name: "Madlyn Moncada", shifts_worked: 2}
    ];
    const shiftToday = ["Madge Mcginty", "Eugenie Etherton"]
    let eligibleEngineers = filterEligibleEngineers(engineers, shiftToday);

    const expected = [
      {id: 1, name: "Malinda Mannion", shifts_worked: 0},
      {id: 2, name: "Bud Bjork", shifts_worked: 0},
      {id: 3, name: "Jarrett Jett", shifts_worked: 0},
      {id: 4, name: "Cassaundra Couts", shifts_worked: 0},
      {id: 5, name: "Ashli Applebee", shifts_worked: 0},
      {id: 6, name: "Myrtice Manfre", shifts_worked: 0},
      {id: 7, name: "Eugenie Etherton", shifts_worked: 0},
      {id: 8, name: "Madge Mcginty", shifts_worked: 0},
      {id: 9, name: "Assunta Austin", shifts_worked: 0},
      {id: 10, name: "Madlyn Moncada", shifts_worked: 0}
    ];

    expect(eligibleEngineers).toEqual(expect.arrayContaining(expected));
  });

});
