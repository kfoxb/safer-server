const Sequelize = require('sequelize');
const db = require('../config.js');
const User = require('../Users/Users.js');

let Labels = db.define('Labels', {
  label: Sequelize.STRING,
  lat: Sequelize.STRING,
  long: Sequelize.STRING
});

Labels.belongsTo(User);

setTimeout(() => {
  Labels.sync();
}, 500);

module.exports = Labels;