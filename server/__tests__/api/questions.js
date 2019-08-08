const frisby = require('frisby');

describe('Questions', function() {
  it('GET should return a status of 200 OK', function() {
    return frisby
      .get('http://localhost:4000/qa/1')
      .expect('status', 200)
      .expect();
  });
});
