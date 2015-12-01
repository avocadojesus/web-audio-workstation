var Validator = require('validator');
var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

/**
 * isPhoneNumber
 * ------------
 * determines whether or not passed var qualifies
 * as a valid phone number
 *
 * @param str(string/integer)
 * @return bool
*/
Validator.extend('isPhoneNumber', function (str) {
  try {
    phoneUtil.isValidNumber(phoneUtil.parse(str, 'US'));
  } catch (e) {
    return false;
  }

  return true;
});

/**
 * isPassword
 * ------------
 * determines whether or not passed argument qualifies
 * as a valid password
 *
 * @param str(string/integer)
 * @return bool
*/
Validator.extend('isPassword', function (str) {
  if (typeof str !== 'string') return false;
  if (
    !/\d/.test(str) ||
    !/[a-zA-Z]/.test(str) ||
    !(str.length > 6)
  ) {
    return false;
  }

  return true;
});

/**
 * toPhoneNumber
 * ------------
 * converts the passed argument to a formatted phone number
 *
 * @param str(string/integer)
 * @return bool
*/
Validator.extend('toPhoneNumber', function (str) {
  try {
    phoneUtil.isValidNumber(phoneUtil.parse(str, 'US'));
  } catch (e) {
    return false;
  }

  var phoneNumber = phoneUtil.parse(str, 'US');
  return phoneUtil.format(phoneNumber, 'US');
});

module.exports = Validator;
