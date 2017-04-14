const Promise = require('bluebird');
const Users = require('../../db/Users/Users.js');
const Contacts = require('../../db/Contacts/Contacts.js');
const Groups = require('../../db/Groups/Groups.js');
const GroupMembers = require('../../db/GroupMembers/GroupMembers.js');
const phone = require('phone');

exports.addGroup = (req, res) => {
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

exports.getGroups = (req, res) => {
  let groupInst = Groups.findAll({where: {userId: req.user.id} } )
  .then(groups => {
    return groups;
  });

  let groupData = Promise.map(groupInst, (group) => {
    return group.get();
  });

  Promise.all(groupData)
  .then(groupData => {
    res.status(200).json(groupData); 
  });
};