const Sequelize = require('sequelize');
const db = require('../config.js');
const User = require('../Users/Users.js');

let Labels = db.define('Labels', {
  userId: Sequelize.INTEGER,
  label: Sequelize.STRING,
  lat: Sequelize.STRING,
  long: Sequelize.STRING
});

Labels.sync();

module.exports = Labels;