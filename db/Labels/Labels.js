const Sequelize = require('sequelize');
const db = require('../config.js');
const User = require('../Users/Users.js');

let Labels = db.define('Labels', {
  userId: Sequelize.INTEGER,
  label: Sequelize.STRING,
  latTlc: Sequelize.DOUBLE,
  lngTlc: Sequelize.DOUBLE,
  latTrc: Sequelize.DOUBLE,
  lngTrc: Sequelize.DOUBLE,
  latBrc: Sequelize.DOUBLE,
  lngBrc: Sequelize.DOUBLE,
  latBlc: Sequelize.DOUBLE,
  lngBlc: Sequelize.DOUBLE,
  latInit: Sequelize.DOUBLE,
  lngInit: Sequelize.DOUBLE
});

Labels.sync();

module.exports = Labels;
