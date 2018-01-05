const pool = require('../build/db_connect');

// single query
// preferred way of querying with node-postgres as it removes the risk
// of leaking a client
pool.query('SELECT * FROM engineers', (err, res) => {
  if (err) {
    console.log(error.stack)
  }

  console.log('engineer:', res.rows)
});
