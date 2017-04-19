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

exports.sendNotifications = (pubId, tokenArray) => {
  Users.findOne({
    where: {id: pubId},
    attributes: ['first', 'last']
  })
  .then(user => {
    user = user.get();
    return name = user.first + ' ' + user.last;
  })
  .then((name) => {
    var payload = {
      data: {
        type: 'MEASURE_CHANGE',
        'custom_notification': JSON.stringify({
          body: `${name} has arrived home safely.`,
          sound: 'default'
        })
      }
    };
    return Promise.each(tokenArray, (token, index) => {
      console.log('admin called');
      return admin.messaging().sendToDevice(token, payload);
    });
  })
  .catch(err => {
    console.log(err);
  });

  // var payload = {
  //   data: {
  //     type: 'MEASURE_CHANGE',
  //     'custom_notification': JSON.stringify({
  //       body: 'Yooo to team blink672',
  //       title: 'From the server',
  //       sound: 'default'
  //     })
  //   }
  // };

  // admin.messaging().sendToDevice(req.user.FCMToken, payload)
  // .then(response => {
  //   console.log(response);
  // })
  // .catch(err => {
  //   console.log(err);
  // });

};
