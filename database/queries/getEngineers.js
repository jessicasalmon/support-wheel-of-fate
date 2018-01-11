const pool = require('../build/db_connect');

const getEngineers = (callback) => {
  pool.query('SELECT * FROM engineers', (err, engineers) => {
    if (err) {
      console.log(err, 'error from query <<<<<<<<<<')
      return callback(err);
    }
    else {
      console.log(engineers.rows, 'GET <<<<<<<<<')
      return callback(null, engineers.rows)
    }
  });
};

module.exports = getEngineers;
