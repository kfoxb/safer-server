const Sequelize = require('sequelize');
const db = require('../config.js');

let User = db.define('User', {
  first: Sequelize.STRING,
  last: Sequelize.STRING,
  phoneNumber: {type: Sequelize.STRING, unique: true},
  email: Sequelize.STRING
});

User.sync();

module.exports = User;