const Sequelize = require('sequelize');
const db = require('../config.js');

let Notifications = db.define('Notifications', {
  pubId: Sequelize.INTEGER,
  subToken: Sequelize.STRING,
});

Notifications.sync();

module.exports = Notifications;