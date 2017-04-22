const Sequelize = require('sequelize');
const dbName = 'saferDb';

const db = new Sequelize(process.env.CLEARDB_DATABASE_URL, {
  logging: true
});

// db.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`).spread(function(results, metadata) {
//   console.log(`creating DATABASE ${dbName}, if it does not exist`);
// });

module.exports = db;