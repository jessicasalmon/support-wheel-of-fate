const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');

const getEngineers = require('./database/queries/getEngineers.js');
const updateEngineers = require('./database/queries/updateEngineers.js');

if (process.env.NODE_ENV === 'test') {
  require('env2')('config-test.env');
}

app.use(bodyParser.json());

// ideally, we would split these calls into smaller modules
// as we only have a couple of API calls, I've left it in here. 
app.get('/engineers', (req, res) => {
  getEngineers((err, engineer) => {
    if(err) {
      return res.status(500).json({
        type: 500,
        message: 'error from server'
      });
    }
    else {
      return res.json(engineer)
    }
  });
});

app.post('/engineers/update', (req, res) => {
  const engineers = req.body;
  updateEngineers(engineers, (err, response) => {
    if (err) {
      return res.status(500).json({
        type: 500,
        message: 'error from the server'
      })
    }
    else {
      return res.status(201).json({
        type: 201,
        message: 'Post request has been successful',
        url: '/engineers/update'
      })
    }
  })
});

app.use('/jessicasalmon/support-wheel-of-fate/', express.static(path.resolve(__dirname, './build')));
app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './build', 'index.html'));
});

module.exports = app;
