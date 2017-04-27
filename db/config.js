const Sequelize = require('sequelize');

const db = new Sequelize(process.env.CLEARDB_DATABASE_URL, {
  pool: {
    maxIdleTime: 120000
  }
});

module.exports = db;
