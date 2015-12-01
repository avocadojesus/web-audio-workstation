var assert = require('assert');
var superagent = require('superagent');
var server = require('../../server');
var status = require('http-status');
var Fixtures = require('../../app/services/fixtures');

describe('users controller', function() {
  var app;

  before(function() {
    app = server.start(8080);
  });

  after(function() {

  });

  beforeEach(function(done) {
    Fixtures.delete().then(function(){
      Fixtures.create().then(function() {
        done();
      });
    });
  });

  it('should create a user', function(done) {
    superagent
      .post('http://localhost:8080/api/v1/users')
      .send({
        phone_number: '93457612',
        password: 'testhamburger1'
      })
      .end(function(err, res) {
        assert.equal(res.status, status.OK);
        done();
      });
  });

  it('should log a user in', function(done) {
    superagent
      .post('http://localhost:8080/api/v1/users/login')
      .send({
        phone_number: '7149245761',
        password: 'ttpassword123'
      })
      .end(function(err, res) {
        assert.equal(res.status, status.OK);
        done();
      });
  });
});
