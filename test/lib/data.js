const engineers = [
  { id: 1, name: 'Malinda Mannion', shifts_worked: 1 },
  { id: 2, name: 'Bud Bjork', shifts_worked: 0 },
  { id: 3, name: 'Jarrett Jett', shifts_worked: 0 },
  { id: 4, name: 'Cassaundra Couts', shifts_worked: 1 },
  { id: 5, name: 'Ashli Applebee', shifts_worked: 0 },
  { id: 6, name: 'Myrtice Manfre', shifts_worked: 0 },
  { id: 7, name: 'Eugenie Etherton', shifts_worked: 0 },
  { id: 8, name: 'Madge Mcginty', shifts_worked: 2 },
  { id: 9, name: 'Assunta Austin', shifts_worked: 0 },
  { id: 10, name: 'Madlyn Moncada', shifts_worked: 0 }
];

const updatedEngineers = {
  engineers: [
    { id: 1, name: 'Malinda Mannion', shifts_worked: 1 },
    { id: 2, name: 'Bud Bjork', shifts_worked: 0 },
    { id: 3, name: 'Jarrett Jett', shifts_worked: 0 },
    { id: 4, name: 'Cassaundra Couts', shifts_worked: 1 },
    { id: 5, name: 'Ashli Applebee', shifts_worked: 0 },
    { id: 6, name: 'Myrtice Manfre', shifts_worked: 0 },
    { id: 7, name: 'Eugenie Etherton', shifts_worked: 0 },
    { id: 8, name: 'Madge Mcginty', shifts_worked: 1 },
    { id: 9, name: 'Assunta Austin', shifts_worked: 1 },
    { id: 10, name: 'Madlyn Moncada', shifts_worked: 0 }
  ],
  shiftToday: ['Madge Mcginty', 'Assunta Austin'],
  shiftYesterday: ['Cassaundra Couts', 'Malinda Mannion']
};

module.exports = {
  engineers,
  updatedEngineers
}
