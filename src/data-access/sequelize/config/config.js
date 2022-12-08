require("dotenv").config;

module.exports = {
  "development": {
    "username": process.env.SQLUSER,
    "password": process.env.SQLPASSWORD,
    "database": process.env.SQLDATABASE,
    "host": process.env.SQLHOST,
    "port": process.env.SQLPORT,
    "dialect": "mssql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mssql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mssql"
  }
}
