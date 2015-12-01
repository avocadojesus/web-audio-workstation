var assert = require('chai').assert;
var superagent = require('superagent');
var server = require('../../server');
var status = require('http-status');
var db = require('../../app/models/sequelize');
var guid = require('guid');
var TTFixtures = require('../../app/services/tt-fixtures');
var sequelize = require('../../app/models/sequelize');
var User = db.User;

describe('users model', function() {

  beforeEach(function(done) {
    TTFixtures.delete().then(function(){
      TTFixtures.create().then(function() {
        console.log('DONEDONEDONEDONEDONEDONEDONEDONEDONEDONEDONEzzzzzzzzz');
        done();
      });
    });
  });

  after(function() {
    TTFixtures.delete();
  })

  it ('should create user', function(done) {
    sequelize
    User.create({
      phone_number: 7149245762,
      password: 'ttpassword123'
    }).then(function(user) {
      assert.equal(7149245762, user.phone_number);
      done();
    }).catch(function(error) {
      throw error;
    });
  });

  it ('should reject user with invalid phone number', function(done) {
    User.create({
      phone_number: 'tree-sap',
      password: 'ttpassword123'
    }).then(function(user) {
      throw 'Failed to catch invalid phone number';
    }).catch(function(error) {
      assert.equal(412, error.code);
      done();
    });
  });

  it ('should reject user with password that is missing numneric chars', function(done) {
    User.create({
      phone_number: '7149245762',
      password: 'ttpassword'
    }).then(function(user) {
      throw 'Failed to catch invalid password';
    }).catch(function(error) {
      assert.equal(412, error.code);
      done();
    });
  })

  it ('should reject user with password that is alpha chars', function(done) {
    User.create({
      phone_number: '7149245762',
      password: '123123456'
    }).then(function(user) {
      throw 'Failed to catch invalid password';
    }).catch(function(error) {
      assert.equal(412, error.code);
      done();
    });
  });

  it ('should reject user with password that is too shot', function(done) {
    User.create({
      phone_number: '7149245762',
      password: 'a23'
    }).then(function(user) {
      throw 'Failed to catch invalid password';
    }).catch(function(error) {
      assert.equal(412, error.code);
      done();
    });
  });

  it ('should be able to compare an unhashed password with a hashed password', function(done) {
    var models = {User: User};
    User.findOne({
      id: "5fd5f408-670a-4e33-aa79-7efdb4d22543"
    }).then(function(user) {
      user
        .comparePasswords('ttpassword123')
        .then(function(is_equal) {
          assert.equal(true, is_equal);
          done();
        }).catch(function(error) {
          throw error;
        });
    })
  });

  it ('should maintain associations', function(done) {
    var models = {User: User};
    User.findOne({
      where: {
        id: "5fd5f408-670a-4e33-aa79-7efdb4d22543"
      },
      include: [db.Friend]
    }).then(function(user) {
      console.log(user)
    })
  });
});
