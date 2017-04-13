const Sequelize = require('sequelize');
const db = require('../config.js');
const User = require('../Users/Users.js');

let GroupMembers = db.define('GroupMembers', {
  groupId: Sequelize.INTEGER,
  userId: Sequelize.INTEGER
});

GroupMembers.sync();

module.exports = GroupMembers;