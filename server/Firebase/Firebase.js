const Promise = require('bluebird');
const Users = require('../../db/Users/Users.js');
const serverKey = process.env.FCM_SERVER_KEY;

var admin = require('firebase-admin');
var serviceAccount = require('./firebase-key.js');

process.env.FIREBASE_KEY_PRIVATE_KEY = process.env.FIREBASE_KEY_PRIVATE_KEY.replace(/\\n/g, '\n');

admin.initializeApp({
  credential: admin.credential.cert({
    'private_key': process.env.FIREBASE_KEY_PRIVATE_KEY,
    'client_email': process.env.FIREBASE_KEY_CLIENT_EMAIL,
  }),
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
    return admin.messaging().sendToDevice(tokenArray, payload)
  .error((err) => {
    console.log(err);
  });
};

exports.sendFriendRequest = (userName, friendToken) => {
  var payload = {
    data: {
      type: 'MEASURE_CHANGE',
      'custom_notification': JSON.stringify({
        title: 'Friend Request',
        body: `${userName} has sent a friend request.`,
        sound: 'default',
      })
    }
  };
  // TODO: return this 
  admin.messaging().sendToDevice(friendToken, payload);
};

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
