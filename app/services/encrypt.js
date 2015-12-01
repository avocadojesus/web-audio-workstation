var bcrypt = require('bcrypt');
var Promise = require('bluebird');

/**
 * hash
 * ------
 * generates a reversable hash
 *
 * @param password(string) - string passed for hashing
 * @return Promise
*/
exports.hash = function(password) {
  return new Promise(function(resolve, reject) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return reject(err);

      bcrypt.hash(password, salt, function(err, hash) {
        if (err) return reject(err);
        return resolve(hash);
      });
    });
  });
};

/**
 * compare
 * ------
 * compares a string with its potentially-hashed counterpart
 *
 * @param unencrypted_pass(string) - unencrpyted version of password
 * @param encrypted_pass(string) - encrpyted version of password
 * @return Promise
*/
exports.compare = function(unencrypted_pass, encrypted_pass) {
  return new Promise(function(resolve, reject) {
    bcrypt.compare(unencrypted_pass, encrypted_pass, function(err, result) {
      if (err) return reject(err);
      return resolve(result);
    });
  });
}
