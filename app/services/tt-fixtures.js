var Fixtures = require('sequelize-fixtures');
var db = require('../models/sequelize');
var async = require('async');
var Promise = require('bluebird');

/**
 * create
 * ------
 * populates db with all fixtures
 *
 * @return Promise
*/
exports.create = function() {
  return new Promise(function(resolve, reject) {
    db.sequelize.sync({force: true}).then(function() {
      var models = {
        User: db.User,
        Friend: db.Friend
      };

      Fixtures
        .loadFiles(
          [
            __dirname + '/../../fixtures/users.json',
            __dirname + '/../../fixtures/friends.json'
          ], models)
        .then(function() {
          return resolve();
        })
    });
  });
}

/**
 * delete
 * ------
 * destroys all fixtures
 *
 * @return Promise
*/
exports.delete = function() {
  return new Promise(function(resolve, reject) {
    db.sequelize.transaction({autocommit:false}).then(function(t) {
      return db.sequelize
        .query('SET FOREIGN_KEY_CHECKS = 0', {raw: true, transaction: t})
        .then(function() {
          async.parallel([
            function(cb) {
              db.User.truncate({transaction: t}).then(function() {
                return cb();
              })
            },
            function(cb) {
              db.Friend.truncate({transaction: t}).then(function() {
                cb();
              })
            }
          ], function() {
            db.sequelize
              .query('SET FOREIGN_KEY_CHECKS = 1', {raw: true, transaction: t})
              .then(function() {
                t.commit().then(function() {
                  return resolve();
                });
              });
          });
        });
    });
  });
}
