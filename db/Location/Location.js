const Sequelize = require('sequelize');
const db = require('../config.js');
const Users = require('../Users/Users.js');

let Location = db.define('Location', {
  incognito: Sequelize.BOOLEAN,
  defaultPrivacy: Sequelize.STRING,
  lat: Sequelize.STRING,
  long: Sequelize.STRING,
  updatedAt: {type: Sequelize.DATE, defaultValue: Sequelize.NOW}
});

Location.belongsTo(Users);

setTimeout(() => {
  Location.sync();
}, 500);

module.exports = Location;