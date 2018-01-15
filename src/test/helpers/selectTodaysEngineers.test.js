import selectTodaysEngineers from '../../helpers/selectTodaysEngineers';


describe('selectTodaysEngineers function', () =>{
  test('returned info follows the rules', () => {

  const eligibleEngineersList = [
    { id: 1, name: 'Malinda Mannion', shifts_worked: 0 },
    { id: 2, name: 'Bud Bjork', shifts_worked: 0 },
    { id: 4, name: 'Cassaundra Couts', shifts_worked: 0 },
    { id: 9, name: 'Assunta Austin', shifts_worked: 0 }
  ];

  const engineersState = [
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

  const ineligibleEngineers = [
    {id: 3, name: "Jarrett Jett", shifts_worked: 1},
    {id: 5, name: "Ashli Applebee", shifts_worked: 1},
    {id: 6, name: "Myrtice Manfre", shifts_worked: 1},
    {id: 7, name: "Eugenie Etherton", shifts_worked: 1},
    {id: 8, name: "Madge Mcginty", shifts_worked: 1},
    {id: 10, name: "Madlyn Moncada", shifts_worked: 1}
  ];

    const result = selectTodaysEngineers(eligibleEngineersList, engineersState);
    expect(result.shiftToday).not.toEqual(expect.arrayContaining(ineligibleEngineers))
    expect(result.shiftToday).not.toEqual(result.shiftToday[1]);
    expect(result.engineers.length).toEqual(10);
  })
});
