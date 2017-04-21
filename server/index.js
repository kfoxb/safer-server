require('dotenv').config({path: './config.env'});
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const { 
  getAllFriendData,
  getFriendById,
  addFriend,
  updateFriend,
  updatePrivacy,
  updateCoordinates,
  getContactInformation,
  findUserWithPhoneNumber,
  updateUser
} = require('./Users/Users.js');

const { updateFCMToken } = require('./Firebase/Firebase.js');
const { addSubscriptionToTable } = require('./Notifications/Notifications.js');

const { 
  addGroup, 
  getGroups, 
  getGroupUsers, 
  getNonGroupUsers, 
  updateGroupUsers,
  updateGroup
} = require('./Groups/Groups.js');
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
  .get(getGroups)
  .put(updateGroup);
  

api.route('/groupUsers')
  .get(getGroupUsers)
  .put(updateGroupUsers);

api.get('/nonGroupUsers', getNonGroupUsers);


api.route('/friends')
  .get(getAllFriendData)
  .post(findUserWithPhoneNumber, addFriend);

api.route('/friends/:id')
  .get(getFriendById)
  .put(updateFriend);

/******************************************/
/*Did Post Because GET was stringifying the array weird*/

api.post('/contacts', getContactInformation);
/******************************************/

api.put('/coordinates', updateCoordinates);

api.get('/test', findUserWithPhoneNumber, addSubscriptionToTable);

app.use('/api', api);

app.get('/api/test', findUserWithPhoneNumber, addSubscriptionToTable);


const port = process.env.PORT || 1337;

app.listen(port);

console.log('Listening on port ', port);