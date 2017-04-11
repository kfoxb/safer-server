const Sequelize = require('sequelize');
const db = require('../config.js');

let Users = db.define('Users', {
  first: Sequelize.STRING,
  last: Sequelize.STRING,
  phoneNumber: {type: Sequelize.STRING, unique: true},
  email: {type: Sequelize.STRING, unique: true},
});

Users.sync();

module.exports = Users;