const fs = require('fs');
const path = require('path');
const connect = require('./db_connect');

const build = fs.readFileSync(path.join(__dirname, 'db_build.sql'), 'utf8');

connect.query(build, (err, res) => {
  if (err) {
    console.log(err);
    console.error(err);
  } else {
    console.log('db build successful');
  }
});
