const Promise = require('bluebird');
const Users = require('../../db/Users/Users.js');
const serverKey = process.env.FCM_SERVER_KEY;

var admin = require('firebase-admin');

process.env.FIREBASE_KEY_PRIVATE_KEY = process.env.FIREBASE_KEY_PRIVATE_KEY.replace(/\\n/g, '\n');

admin.initializeApp({
  credential: admin.credential.cert({
    'private_key': process.env.FIREBASE_KEY_PRIVATE_KEY,
    'client_email': process.env.FIREBASE_KEY_CLIENT_EMAIL,
  }),
  databaseURL: 'https://fir-safer.firebaseio.com'
});

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
    return admin.messaging().sendToDevice(tokenArray, payload);
  }).error((err) => {
    console.log(err);
  });
};

exports.sendFriendRequest = (userName, friendToken) => {
  var payload = {
    data: {
      type: 'MEASURE_CHANGE',
      friendRequest: true,
      'custom_notification': JSON.stringify({
        title: 'Friend Request',
        body: `${userName} has sent a friend request.`,
        sound: 'default',
      })
    }
  };
  // TODO: return this 
  return admin.messaging().sendToDevice(friendToken, payload);
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
