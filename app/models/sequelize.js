var dbConfig = require('../config/database');
var Sequelize = require('sequelize');
var fs = require("fs");
var path = require("path");
var db = {};

var sequelize = new Sequelize(dbConfig.dev.database, dbConfig.dev.user, dbConfig.dev.password, {
  logging: true,
  host: dbConfig.dev.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "sequelize.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
