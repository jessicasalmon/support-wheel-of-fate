const pool = require('../build/db_connect');

const getEngineers = (callback) => {
  pool.query('SELECT * FROM engineers', (err, engineers) => {
    if (err) {
      return callback(err);
    }
    else {
      return callback(null, engineers.rows)
    }
  });
};

module.exports = getEngineers;
