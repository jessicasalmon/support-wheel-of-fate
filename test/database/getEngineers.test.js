const test = require('tape');
const getEngineers = require('../../database/queries/getEngineers.js');
const pool = require('../../database/build/db_connect.js');

test('getEngineers query should return correct data from the database', t => {
  t.plan(1);

  getEngineers((err, engineers) => {
    const actual = engineers.length;
    const expected = 10;

    if (err) {
      t.error(err);
    }
    else {
      t.same(actual, expected, 'should be same');
    }
  });
});
