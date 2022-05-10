var request = require('supertest');
var expect = require('chai').expect;

var app = require('./app.js');
describe('Our server', function() {
    it('Testing the test', function() {
        expect(5).to.equal(5);
    });
});

describe('Testing login page', function() {
  
    before(function(done) {
        app.listen(function() {
          done();
        });
    });

    it('Trying to app.get for page login', function(done) {
      request(app)
        .get('/Log-In')
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
            return done();
        });
    });
  
  });