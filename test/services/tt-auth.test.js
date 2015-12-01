var assert = require('chai').assert;
var TTAuth = require('../../app/services/tt-auth');
var TTFixtures = require('../../app/services/tt-fixtures');

describe('tt-auth', function() {

  beforeEach(function(done) {
    TTFixtures.delete().then(function(){
      TTFixtures.create().then(function() {
        done();
      });
    });
  });

  it ('should generate and reverse tokens with sanity', function(done) {
    var token = TTAuth.createToken('5fd5f408-670a-4e33-aa79-7efdb4d22543');
    TTAuth.decodeToken(token).then(function(token) {
      assert.equal('5fd5f408-670a-4e33-aa79-7efdb4d22543', token.user.id);
      done();
    });
  });
});
