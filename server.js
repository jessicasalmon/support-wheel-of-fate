const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const getEngineers = require('./database/queries/getEngineers.js');
const updateEngineers = require('./database/queries/updateEngineers.js');

app.use(bodyParser.json());

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

module.exports = app;
