var Sequelize = require('sequelize');
var Promise = require('bluebird');
var guid = require('guid');
var TTError = require('../services/tt-error');
var TTValidator = require('../services/tt-validator');
var TTEncrypt = require('../services/tt-encrypt');
var UserRestSchema = require('../rest-schemas/user-rest-schema');
var Async = require('async');

module.exports = function(sequelize, DataTypes) {
  /**
   * user.comparePasswords
   * ---------------------
   * compares an unencrypted password with the password
   * attached to the called user
   *
   * @param password(string) - unencrypted password
   * @return bool
   */
  function __comparePasswords(password) {
    var self = this;
    return new Promise(function(resolve, reject) {
      TTEncrypt.compare(password, self.password)
        .then(function(is_equal) {
          resolve(is_equal);
        }).catch(function(err) {
          reject(err);
        });
    });
  }

  /**
   * user.toAPI
   * ---------------------
   * converts a user object to the respected schema format
   * @return object
   */
  function __toAPI() {
    return UserRestSchema.toAPI(this);
  }

  /**
   * schema
   * -------
   * Defines the schema of the table
  */
  var schema = {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
      allowNull: false,
      primaryKey: true
    },
    phone_number: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
  };

  /**
   * opts
   * -------
   * declares db options
  */
  var opts = {
    tableName: 'users',
    timestamps: ['created', 'updated'],
    createdAt: 'created',
    updatedAt: 'updated',
    classMethods: {
      associate: function(models) {
        
      }
    },
    instanceMethods: {
      comparePasswords: __comparePasswords,
      toAPI: __toAPI
    },
    hooks: {
      beforeCreate: function(user, options) {
        var self = this;
        return new Promise(function(resolve, reject) {
          // validate phone number
          if (!TTValidator.isPhoneNumber(user.phone_number))
            reject(new TTError(412, 'This phone number is invalid'));

          // validate password
          if (!TTValidator.isPassword(user.password))
            reject(new TTError(412, 'This password is invalid'));

          Async.parallel([
            // make sure phone number doesnt exist in database
            function(cb) {
              self
                .findOne({
                  where: {
                    phone_number: user.phone_number
                  }
                })
                .then(function(existing_user) {
                  if (existing_user) return cb(new TTError(412, 'User Exists'));
                  return cb(null);
                });
            },

            // hash password
            function(cb) {
              TTEncrypt.hash(user.password)
                .then(function(hash) {
                  user.password = hash;
                  return cb(null);
                }).catch(function(error) {
                  if (error) return cb(error);
                });
            }
          ], function(error) {
            if (error) return reject(error);
            return resolve(user, options);
          });
        });
      }
    }
  }

  var User = sequelize.define('User', schema, opts);
  return User;
};
