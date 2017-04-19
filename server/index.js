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

const api = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));
api.use(authorization);

api.route('/users/location')
  .put(updateCoordinates);

api.route('/user')
  .put(updateUser);

api.route('/labels')
  .get(getAllFences)
  .post(addLabel);


api.route('/groups')
  .post(addGroup)
  .get(getGroups);
  
api.get('/groupUsers', getGroupUsers);

api.route('/friends')
  .get(getAllFriendData)
  .post(addFriend);

api.route('/friends/:id')
  .get(getFriendById)
  .put(updateFriendById);

/******************************************/
/*Did Post Because GET was stringifying the array weird*/

api.post('/contacts', getContactInformation);
/******************************************/

api.post('/fcmToken', updateFCMToken);

api.put('/privacySettings', updatePrivacy);

api.put('/coordinates', updateCoordinates);

<<<<<<< HEAD
api.get('/test', findUserWithPhoneNumber, addSubscriptionToTable);
=======
<<<<<<< HEAD
app.put('/api/coordinates', updateCoordinates);
>>>>>>> Storing user's label and last known location to their table

app.use('/api', api);

<<<<<<< HEAD
const port = process.env.PORT || 1337;
=======
=======
>>>>>>> Storing user's label and last known location to their table
let port = process.env.PORT || 1337;
>>>>>>> Storing user's label and last known location to their table

app.listen(port);

console.log('Listening on port ', port);