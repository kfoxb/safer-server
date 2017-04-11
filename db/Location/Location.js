const Sequelize = require('sequelize');
const db = require('../config.js');
const Users = require('../Users/Users.js');

let Location = db.define('Location', {
  incognito: Sequelize.BOOLEAN,
  defaultPrivacy: {type: Sequelize.STRING, allowNull: false, defaultValue: 'label'},
  lat: Sequelize.STRING,
  long: Sequelize.STRING,
});

Location.belongsTo(Users);

Location.sync();

module.exports = Location;