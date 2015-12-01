var User = require('../models/user');
var Validator = require('../services/validator');
var Permissions = require('../services/permissions');
var Auth = require('../services/auth');
var Encrypt = require('../services/encrypt');

/**
 * GET /api/v1/users(/:id)
 * ---------------------
 * returns either a single user, or else all users
 * available to the authenticated user
 */
exports.get = function(req, res, io) {
  res.end('users');
}


/**
 * POST /api/v1/users/login
 * ---------------------
 * returns a login token
 *
 * @param phone_number(string)
 * @param password(string)
 * @return token
 */
exports.login = function(req, res) {
  // sanitize input
  if (!Validator.toPhoneNumber(req.body.phone_number))
    return res.error(412, 'Invalid format for phone number');

  if (!Validator.isPassword(req.body.password))
    return res.error(412, 'Invalid argument for password');

  User
    .findOne({
      where: {
        phone_number: req.body.phone_number
      }
    })
    .then(function(user) {
      if (!user) return res.error(401, 'Invalid email or password');

      user.comparePasswords(req.body.password).then(function(is_equal) {
        if (!is_equal) return res.error(401, 'Invalid email or password');
        var token = Auth.createToken(user.id);
        res.success({token: token});
      });
    });
}

/**
 * POST /api/v1/users
 * ---------------------
 * creates a user in the database
 *
 * @param phone_number(string)
 * @param password(string)
 * @return user
 */
exports.create = function(req, res) {
  // sanitize input
  if (!Validator.toPhoneNumber(req.body.phone_number))
    return res.error(412, 'Invalid format for phone number');

  if (!Validator.isPassword(req.body.password))
    return res.error(412, 'Invalid argument for password');

  // create user in database
  User.create({
    phone_number: req.body.phone_number,
    password: req.body.password
  }).then(function(user) {
    res.success({user: user.toAPI()});
  }).catch(function(error) {
    res.error(error.code, error.message);
  });
}
