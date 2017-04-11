require('dotenv').config({path: './config.env'});
const express = require('express');
const app = express();
const { 
  getAllFriends,
  addFriend,
  getFriendById,
  updateFriendById
} = require('./Users/Users.js');
const { updateCoordinates, updatePrivacy } = require('./Location/Location.js');


//this route for server side validation with Google
//this may actually need to be set up as middleware rather than it's own route
//as every request may need to be validated
//see https://developers.google.com/identity/sign-in/android/backend-auth
app.post('/api/validate', function(req, res) {
  res.json('validated!');
});

app.route('/api/friends')
  .get(getAllFriends)
  .post(addFriend);

app.route('/api/friends/:id')
  .get(getFriendById)
  .put(updateFriendById);

app.put('/api/privacySettings', updatePrivacy);

app.put('/api/updateCoordinates', updateCoordinates);

let port = process.env.PORT || 1337;

app.listen(port);

console.log('Listening on port ', port);