const Sequelize = require('sequelize');
const db = require('../config.js');
const User = require('../Users/Users.js');

let Contacts = db.define('Contacts', {
  userId: Sequelize.INTEGER,
  friendId: Sequelize.INTEGER,
  privacy: Sequelize.STRING
});

Contacts.sync();

module.exports = Contacts;