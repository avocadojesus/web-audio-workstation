var assert = require('chai').assert;
var TTEncrypt = require('../../app/services/tt-encrypt');

describe('tt-encrypt', function() {

  it ('should properly generate reversable encrypted password', function(done) {
    TTEncrypt.hash('ttpassword123').then(function(hash) {
      TTEncrypt.compare('ttpassword123', hash).then(function(is_equal) {
        assert.equal(true, is_equal);
        done();
      })
    })
  });
});
