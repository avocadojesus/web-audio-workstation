var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;
var async = require('async');

exports.up = function (db, callback) {
  async.series([
    db.createTable.bind(db, 'users',
    {
      id: {
        type: 'char',
        notNull: true,
        primaryKey: true,
        autoIncrement: false,
        length: 36
      },
      phone_number: {
        type: 'string',
        notNull: true,
        length: 11,
      },
      password: {
        type: 'string',
        notNull: true,
        length: 100,
      },
      created: 'datetime',
      updated: 'datetime'
    })
  ], callback);
};

exports.down = function(db, callback) {
  async.series([
    db.dropTable.bind(db, 'timeblocks'),
    db.dropTable.bind(db, 'users')
  ], callback);
};
