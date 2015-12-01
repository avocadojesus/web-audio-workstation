var assert = require('chai').assert;
var superagent = require('superagent');
var server = require('../../server');
var status = require('http-status');
var guid = require('guid');
var TTFixtures = require('../../app/services/tt-fixtures');
var sequelize = require('../../app/models/sequelize');
var async = require('async');
var db = require('../../app/models/sequelize');
var User = db.User;
var Friend = db.Friend;

describe('friends model', function() {

  beforeEach(function(done) {
    TTFixtures.delete().then(function(){
      TTFixtures.create().then(function() {
        done();
      });
    });
  });

  after(function() {
    TTFixtures.delete();
  })

  it ('should create friend', function(done) {
    Friend.create({
      user1_id: '5fd5f408-670a-4e33-aa79-7efdb4d22543',
      user2_id: '9ccc3308-991d-4755-b8f1-1dec53f00ca0'
    }).then(function(friend) {
      assert.equal('5fd5f408-670a-4e33-aa79-7efdb4d22543', friend.user1_id)
      assert.equal('9ccc3308-991d-4755-b8f1-1dec53f00ca0', friend.user2_id)
      done();
    }).catch(function(error) {
      throw error;
    });
  });

  it ('shouldnt create friend with invalid user id', function(done) {
    async.parallel([
      function(cb) {
        Friend.create({
          user1_id: 'taco',
          user2_id: '9ccc3308-991d-4755-b8f1-1dec53f00ca0'
        }).catch(function(error) {
          assert.equal(412, error.code);
          return cb(null);
        });
      },

      function(cb) {
        Friend.create({
          user1_id: '9ccc3308-991d-4755-b8f1-1dec53f00ca0',
          user2_id: 'taco'
        }).catch(function(error) {
          assert.equal(412, error.code);
          return cb(null);
        });
      }
    ], function(err) {
      if (err) throw err;
      done();
    })
  });

  it ('shouldnt create a friend that already exists', function(done) {
    async.parallel([
      function(cb) {
        Friend.create({
          user1_id: 'taco',
          user2_id: '9ccc3308-991d-4755-b8f1-1dec53f00ca0'
        }).catch(function(error) {
          assert.equal(412, error.code);
          return cb(null);
        });
      },

      function(cb) {
        Friend.create({
          user1_id: '9ccc3308-991d-4755-b8f1-1dec53f00ca0',
          user2_id: 'taco'
        }).catch(function(error) {
          assert.equal(412, error.code);
          return cb(null);
        });
      }
    ], function(err) {
      if (err) throw err;
      done();
    })
  });

  it ('should maintain associations', function(done) {
    Friend
      .findByUserId('9ccc3308-991d-4755-b8f1-1dec53f00ca0')
      .then(function(friends) {
        friends.map(function(friend) {
          assert.equal('object', (typeof friend.User))
          assert.equal('object', (typeof friend.RequestedUser))
          assert.equal('9ccc3308-991d-4755-b8f1-1dec53f00ca0', friend.RequestedUser.id);
          assert.notEqual('9ccc3308-991d-4755-b8f1-1dec53f00ca0', friend.User.id);
        });

        done();
      });
  });

});
