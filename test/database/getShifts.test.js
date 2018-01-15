const test = require('tape');
const getShifts = require('../../database/queries/getShifts.js');
const pool = require('../../database/build/db_connect.js');

test('getShifts query should return correct data from the database', t => {
  t.plan(1);

  getShifts((err, shifts) => {
    const actual = Object.keys(shifts);
    const expected = ['id', 'shift_today', 'shift_yesterday'];

    if (err) {
      t.error(err);
    }
    else {
      t.same(actual, expected, 'should be same');
    }
  });
});
