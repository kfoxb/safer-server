const Sequelize = require('sequelize');
const db = require('../config.js');
const User = require('../Users/Users.js');

let Groups = db.define('Groups', {
  userId: Sequelize.INTEGER,
  name: Sequelize.STRING,
  privacy: Sequelize.STRING
});

Groups.sync();

module.exports = Groups;