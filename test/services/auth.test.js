var assert = require('chai').assert;
var Auth = require('../../app/services/auth');
var Fixtures = require('../../app/services/fixtures');

describe('tt-auth', function() {

  beforeEach(function(done) {
    Fixtures.delete().then(function(){
      Fixtures.create().then(function() {
        done();
      });
    });
  });

  it ('should generate and reverse tokens with sanity', function(done) {
    var token = Auth.createToken('5fd5f408-670a-4e33-aa79-7efdb4d22543');
    Auth.decodeToken(token).then(function(token) {
      assert.equal('5fd5f408-670a-4e33-aa79-7efdb4d22543', token.user.id);
      done();
    });
  });
});
