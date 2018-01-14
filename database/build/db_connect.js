const { Pool } = require('pg');
const url = require('url');
const environment = require('env2');
let options;

if (process.env.NODE_ENV === 'test') {
  options = {
    database: 'support-wheel-of-fate'
  }
  environment('./config-test.env');
}


if (process.env.NODE_ENV === 'production') {
  const params = url.parse(process.env.DATABASE_URL);
  const [username, password] = params.auth.split(':');

  options = {
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    max: process.env.DB_MAX_CONNECTIONS || 19,
    ssl: params.hostname !== 'localhost',
    idleTimeoutMillis: process.env.NODE_ENV === 'test' ? 1000 : 30000
  };

  if (username) {
  options.user = username;
  }
  if (password) {
    options.password = password;
  }
}


module.exports = new Pool(options);
