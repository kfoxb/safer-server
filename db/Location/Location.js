const Sequelize  = require('sequelize');
const db = require('../config.js');
const Users = require('../Users/Users.js')

let Location = db.define('Location', {
  lat: Sequelize.STRING,
  long: Sequelize.STRING,
  lastUpdate: Sequelize.DATE
});

Location.belongsTo(Users);

Location.sync();

module.exports = Location;