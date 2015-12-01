var jwt = require('jsonwebtoken');
var loginSalt = require('../config/authentication').loginSalt;
var Promise = require('bluebird');

/**
 * createToken
 * ------------
 * generates a new login token based on a user id
 *
 * @param user_id(guid) - id of the respective user
 * @return JWT
*/

exports.createToken = function(user_id) {
  var token = jwt.sign({
    user: {
      id: user_id
    }
  }, loginSalt);

  return token;
}

/**
 * getUserFromToken
 * ------------
 * parses token, collects user
 *
 * @param user_id(guid) - id of the respective user
 * @return User
*/

exports.decodeToken = function(token) {
  return new Promise(function(resolve, reject) {
    jwt.verify(token, loginSalt, function(err, decoded) {
      if (err) return reject(err);
      return resolve(decoded);
    });
  });
}
