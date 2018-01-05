const { Pool, Client } = require('pg');
const connectionString = 'postgres://jessicasalmon:@localhost:5432/support-wheel-of-fate';

const pool = new Pool({
  connectionString: connectionString,
});

module.exports = pool;
