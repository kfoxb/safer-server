const Promise = require('bluebird');
const Notifications = require('../../db/Notifications/Notifications.js');
const { sendNotifications } = require('../Firebase/Firebase.js');
const phone = require('phone');

exports.addSubscriptionToTable = (req, res) => {
  Notifications.findOrCreate({where: {pubId: req.user.id, subToken: req.friend.FCMToken}})
  .then(() => {
    res.status(201).json({status: 'Subscription created'});
  })
  .then(() => {
    exports.checkSubscriptions(1, 'Elsewhere', 'Home'); //TODO: use this elsewhere after testing is finished
  })
  .catch((err) => {
    console.log('There was an error subscribing to a friend: ', err);
    res.status(500);
    if (res.error) {
      res.json();
    } else {
      res.error = err;
      res.json(err);
    }
  });
};

exports.checkSubscriptions = (userId, oldLabel, newLabel) => {
  if (oldLabel === 'Home' || newLabel !== 'Home') { return; }
  if (newLabel === 'Home') {
    Notifications.findAll({where: {pubId: userId}})
    .then((subs) => {
      var subsArray = [];
      subs.forEach( s => {
        subsArray.push(s.get().subToken);
      });
      sendNotifications(userId, subsArray);
      return Notifications.destroy({where: {pubId: userId}});
    })
    .catch((err) => {
      console.log(err);
    });
  }
};
