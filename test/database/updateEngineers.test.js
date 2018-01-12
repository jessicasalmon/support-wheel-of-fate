const test = require('tape');
const updateEngineers = require('../../database/queries/updateEngineers.js');
const pool = require('../../database/build/db_connect.js');
const data = require('../lib/data.js');

test('updateEngineers query should return correct data from the database', t => {
  t.plan(1);
    const engineer = data.updatedEngineers;

    updateEngineers(engineer, (err, engineers) => {
      const actual = engineers.rowCount;
      const expected = 10;

      if(err){
        t.error(err);
      }
      else {
        t.same(actual, expected, 'should be same');
      }
    });
});
