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

//label: Sequelize.STRING,
//lat_tlc: Sequelize.STRING,
//lng_tlc: Sequelize.STRING,
//lat_trc: Sequelize.STRING,
//lng_trc: Sequelize.STRING,
//lat_brc: Sequelize.STRING,
//lng_brc: Sequelize.STRING,
//lat_lbc: Sequelize.STRING,
//lng_lbc: Sequelize.STRING,
//lat_init: Sequelize.STRING,
//lng_init: Sequelize.STRING

//Label.belongsTo(User);
