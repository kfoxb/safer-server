const Promise = require('bluebird');
const Users = require('../../db/Users/Users.js');
const serverKey = require('../Firebase/fcm-server-key.js').serverKey;
const axios = require('axios');

exports.updateFCMToken = (req, res) => {
  //TODO: move the notification sending logic elsewhere
  //currently sending a notification upon loading the app
  axios.get('https://fcm.googleapis.com/fcm/send')


  //TODO: set a userId on the req.body to query the db with
  //currently hardcoding to 1
  Users.findOne({where: {id: req.body.userId}})
  .then(user => {
    return user.update({FCMToken: req.body.FCMToken});
  }).then(user => {
    res.status(200).send();
  }).catch(err => {
    res.status(500).json({err: err});
  });
};
