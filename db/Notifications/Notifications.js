const Sequelize = require('sequelize');
const db = require('../config.js');

let Notifications = db.define('Notifications', {
  pubId: Sequelize.INTEGER,
  subId: Sequelize.INTEGER,
});

Notifications.sync();

module.exports = Notifications;