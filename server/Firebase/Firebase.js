const Promise = require('bluebird');
const Users = require('../../db/Users/Users.js');
const serverKey = require('../Firebase/fcm-server-key.js').serverKey;
// const axios = require('axios');

var admin = require('firebase-admin');

var serviceAccount = require('./firebase-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://fir-safer.firebaseio.com'
});

exports.updateFCMToken = (req, res) => {
  //TODO: move the notification sending logic elsewhere
  //currently sending a notification upon loading the app
  var payload = {
    data: {
      type: 'MEASURE_CHANGE',
      'custom_notification': JSON.stringify({
        body: 'Yooo to team blink672',
        title: 'From the server',
        sound: 'default'
      })
    }
  };

  // admin.messaging().sendToDevice(req.body.FCMToken, payload)
  // .then(response => {
  //   console.log(response);
  // })
  // .catch(err => {
  //   console.log(err);
  // });

  //TODO: set a userId on the req.body to query the db with
  //currently hardcoding to 1
  Users.findOne({where: {id: req.user.id}})
  .then(user => {
    return user.update({FCMToken: req.body.FCMToken});
  }).then(user => {
    res.status(200).send();
  }).catch(err => {
    res.status(500).json({err: err});
  });
};
