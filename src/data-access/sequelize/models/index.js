"use strict";

const Sequelize = require("sequelize");
const process = require("process");
const env = process.env.NODE_ENV || "development";
const dbConfig = require(__dirname + "../../config/config.js")[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.permissions = require("./permissions.js")(sequelize, Sequelize);
db.permissionsType = require("./permissionsType.js")(sequelize, Sequelize);

module.exports = db;
