const Sequelize = require('sequelize');
const db = require('../config.js');
const User = require('../Users/Users.js');

let Contacts = db.define('Contacts', {
  privacy: Sequelize.STRING
});

Contacts.belongsTo(User);
Contacts.belongsTo(User, {foreignKey: 'friendID'});

Contacts.sync();

module.exports = Contacts;