const Sequelize = require('sequelize');
const db = require('../config.js');
const User = require('../Users/Users.js');

let Labels = db.define('Labels', {
  userId: Sequelize.INTEGER,
  label: Sequelize.STRING,
  address: Sequelize.STRING,
  lat: Sequelize.DOUBLE,
  lng: Sequelize.DOUBLE
});

Labels.sync();

module.exports = Labels;
