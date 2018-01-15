const connect = require('../build/db_connect');

const updateShifts = (shiftToday, shiftYesterday, callback) => {
  const query = `UPDATE shifts
    SET shift_today = ARRAY[$1,$2], shift_yesterday = ARRAY[$3,$4]
    WHERE id = 1;`;

  const params = [
    shiftToday[0],
    shiftToday[1],
    shiftYesterday[0],
    shiftYesterday[1]
  ];

  connect.query(query, params, (err, res) => {
    if(err) {
      return callback(err)
    }
    else {
      return callback(null, res);
    }
  });
}

module.exports = updateShifts;
