const test = require('tape');
const updateShifts = require('../../database/queries/updateShifts.js');
const pool = require('../../database/build/db_connect.js');
const data = require('../lib/data.js');

test('updateShifts query should return correct data from the database', t => {
  t.plan(1);
    const shiftYesterday = data.updatedEngineers.shiftYesterday;
    const shiftToday = data.updatedEngineers.shiftToday;

    updateShifts(shiftToday, shiftYesterday, (err, shifts) => {
      const actual = shifts.rowCount;
      const expected = 1;

      if(err){
        t.error(err);
      }
      else {
        t.same(actual, expected, 'should be same');
      }
    });
});
