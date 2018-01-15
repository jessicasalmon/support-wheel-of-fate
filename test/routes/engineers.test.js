const test = require('tape');
const request = require('supertest');
const app = require('../../server.js');
const data = require('../lib/data.js');

const server = request.agent(app);

test('/engineers route should return a status of 200 and correct data', t => {
  t.plan(1);
  const expected = 10;
  // const expected = data.engineers;

  server
  .get('/engineers')
  .expect(200)
  .expect('Content-Type', /json/)
  .end((err, res) => {
    const actual = res.body;
    if(err) {
      t.error(err, 'tested for errors')
    }
    else {
      t.same(actual.length, expected, 'Results as expected')
    }
  });
});

test('/engineers/update route should return a status of 201', t => {
  t.plan(1);
  const payload = data.updatedEngineers;
  const expected = {
    type: 201,
    message: 'Post request has been successful',
    url: '/engineers/update'
  }

  server
  .post('/engineers/update')
  .send(payload)
  .expect(201)
  .expect('Content-Type', /json/)
  .end((err, res) => {
    const actual = res.body;

    if(err) {
      t.error('tested for errors')
    }
    else {
      t.same(actual, expected, 'Results as expected')
    }
  });

});
