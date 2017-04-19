require('dotenv').config({path: './config.env'});
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const { 
  getAllFriendData,
  getFriendById,
  addFriend,
  updateFriendById,
  updatePrivacy,
  updateCoordinates,
  getContactInformation,
  findUserWithPhoneNumber,
  updateUser
} = require('./Users/Users.js');

const { updateFCMToken } = require('./Firebase/Firebase.js');
const { addSubscriptionToTable } = require('./Notifications/Notifications.js');

const { addGroup, getGroups, getGroupUsers } = require('./Groups/Groups.js');
const authorization = require('./Authorization/Authorization.js');
const {addLabel, getAllFences} = require('./Labels/Labels.js');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));
app.use(authorization);

app.route('/api/users/location')
  .put(updateCoordinates);

app.route('/api/user/')
  .put(updateUser);

app.route('/api/labels')
  .get(getAllFences)
  .post(addLabel);


app.route('/api/groups')
  .post(addGroup)
  .get(getGroups);
  
app.get('/api/groupUsers', getGroupUsers);

app.route('/api/friends')
  .get(getAllFriendData)
  .post(addFriend);

app.route('/api/friends/:id')
  .get(getFriendById)
  .put(updateFriendById);

/******************************************/
/*Did Post Because GET was stringifying the array weird*/

app.post('/api/contacts', getContactInformation);
/******************************************/

app.post('/api/fcmToken', updateFCMToken);

app.put('/api/privacySettings', updatePrivacy);

app.put('/api/coordinates', updateCoordinates);

app.get('/api/test', findUserWithPhoneNumber, addSubscriptionToTable);

let port = process.env.PORT || 1337;

app.listen(port);

console.log('Listening on port ', port);