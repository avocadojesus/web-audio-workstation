var assert = require('chai').assert;
var Encrypt = require('../../app/services/encrypt');

describe('encrypt', function() {

  it ('should properly generate reversable encrypted password', function(done) {
    Encrypt.hash('ttpassword123').then(function(hash) {
      Encrypt.compare('ttpassword123', hash).then(function(is_equal) {
        assert.equal(true, is_equal);
        done();
      })
    })
  });
});
