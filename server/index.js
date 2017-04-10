require('dotenv').config({path: './config.env'});
const express = require('express');
const app = express();
const { 
  getAllFriends,
  addFriend,
  getFriendById,
  updateFriendById
} = require('./Users/Users.js');
const { changePrivacySettings } = require('./PersonalPrivacy/PersonalPrivacy.js');
const { updateCoordinates } = require('./Location/Location.js');
const authorization = require('./Authorization/Authorization.js');

//this middleware is for server side authorization from Google
//see https://developers.google.com/identity/sign-in/android/backend-auth
app.use(authorization);

app.route('/api/friends')
  .get(getAllFriends)
  .post(addFriend);

app.route('/api/friends/:id')
  .get(getFriendById)
  .put(updateFriendById);

app.put('/api/privacySettings', changePrivacySettings);

app.put('/api/coordinates', updateCoordinates);

let port = process.env.PORT || 1337;

app.listen(port);

console.log('Listening on port ', port);