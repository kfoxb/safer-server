const Promise = require('bluebird');
const Notifications = require('../../db/Notifications/Notifications.js');
const phone = require('phone');

exports.addSubscriptionToTable = (req, res) => {
  Notifications.findOrCreate({where: {pubId: req.user.id, subToken: req.friend.FCMToken}})
  .then(() => {
    res.status(200).json({status: 'Subscription created.'});
  })
  .catch((err) => {
    res.status(500);
    if (res.error) {
      res.json();
    } else {
      res.error = err;
      res.json();
    }
  })
};

exports.checkSubscriptions = (userId, oldLabel, newLabel) => {
  if (oldLabel === 'Home' || newLabel !== 'Home') { return; }
  if (newLabel === 'Home') {
    Notifications.find({where: {pubId: userId}})
    .then((subs) => {
      console.log(subs);
    })
  }
}
