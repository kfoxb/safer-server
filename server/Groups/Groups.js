const Promise = require('bluebird');
const Users = require('../../db/Users/Users.js');
const Contacts = require('../../db/Contacts/Contacts.js');
const Groups = require('../../db/Groups/Groups.js');
const GroupMembers = require('../../db/GroupMembers/GroupMembers.js');
const phone = require('phone');

exports.addGroup = (req, res) => {
  console.log(req.body.groupSettings);
  console.log(req.user.id);

  let groupSettings = req.body.groupSettings;

  let groupId = Groups.create({userId: req.user.id, name: groupSettings.groupName, privacy: groupSettings.privacy})
  .then( newGroupInst => {
    return newGroupInst.get();
  });

  let userId = Promise.map(groupSettings.users, (user) => {
    return Users.find({where: {phoneNumber: user.phoneNumber}});
  });

  Promise.all([groupId, userId])
  .spread((groupResult, userResult) => {
    return Promise.map(userResult, (user) => {
      let userData = user.get();
      return GroupMembers.create({groupId: groupResult.id, userId: userData.id });
    });
  })
  .then( results => {
    res.status(201).json('SUCCESS!!! Group Add');
  })
  .catch( err => {
    res.status(400).json(`Error in adding group member ${err}`);
  });
};