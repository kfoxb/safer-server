const Sequelize = require('sequelize');
const mysql = require('mysql');

let dbName = 'saferDb';

const db = new Sequelize(process.env.CLEARDB_DATABASE_URL, {
  logging: false
});

db.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`).spread(function(results, metadata) {
  console.log(`creating DATABASE ${dbName}, if it does not exist`);
});

module.exports = db;