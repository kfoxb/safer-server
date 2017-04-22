const Sequelize = require('sequelize');
const dbName = 'saferDb';

const db = new Sequelize(process.env.CLEARDB_DATABASE_URL, {
  logging: true
});

module.exports = db;