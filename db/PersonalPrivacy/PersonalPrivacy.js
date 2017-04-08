const Sequelize = require('sequelize');
const db = require('../config.js');
const User = require('../Users/Users.js');

let Privacy = db.define('Privacy', {
  incognito: Sequelize.BOOLEAN,
  defaultPrivacy: Sequelize.STRING
});

Privacy.belongsTo(User);

Privacy.sync();

module.exports = Privacy;