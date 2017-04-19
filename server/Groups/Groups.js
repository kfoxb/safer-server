const Promise = require('bluebird');
const Users = require('../../db/Users/Users.js');
const Contacts = require('../../db/Contacts/Contacts.js');
const Groups = require('../../db/Groups/Groups.js');
const GroupMembers = require('../../db/GroupMembers/GroupMembers.js');
const phone = require('phone');

exports.addGroup = (req, res) => {
  let groupSettings = req.body.groupSettings;
  let groupId = Groups.findOrCreate({where: {userId: req.user.id, name: groupSettings.groupName}, 
    default: {
      privacy: groupSettings.privacy
    }
  })
  .spread( (newGroupInst, create) => {
    if (create) {
      return newGroupInst.get();
    } else {
      throw 'Exists';
    }
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
    console.error(err);
    if (err === 'exist') {
      res.status(409).json('Group already exist');
    } else {
      res.status(400).json(`Error in adding group member ${err}`);
    }
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
  })
  .catch(err => {
    console.error(err);
    res.status(201).json(err);
  });
};

exports.getNonGroupUsers = (req, res) => {
  Groups.findOne({where: {userId: req.user.id, name: req.query.name} })
  .then(groupInst => {
    let groupData = groupInst.get();
    return GroupMembers.findAll({where: {groupId: groupData.id} });
  })
  .then(memberInst => {
    return Promise.map(memberInst, (member) => {
      return member.get('id');
    });
  })
  .then(memberData => {
    return Contacts.findAll({
      where: {
        userId: req.user.id, 
        $and: [ {friendId: {$ne: memberData}} ]
      }
    });
  })
  .then(contactInst => {
    return Promise.each(contactInst, (contact) => {
      console.log(contact.get());
    });
  });
};

exports.getGroupUsers = (req, res) => {
  res.locals.groupUserData = [];
  Groups.find({where: {userId: req.user.id, name: req.query.name} })
  .then(groupInst => {
    let groupData = groupInst.get();
    return GroupMembers.findAll({where: {groupId: groupData.id} });
  })
  .then(memberInst => {
    return Promise.map(memberInst, (member) => {
      let memberData = member.get();
      return Users.find({where: {id: memberData.userId} });
    });
  })
  .then(userInst => {
    return Promise.map(userInst, (user) => {
      res.locals.groupUserData.push(user.get());
      return user.get();
    });
  })
  .then(userData => {
    return Promise.map(userData, (user) => {
      return Contacts.findOne({where: {userId: user.id, friendId: req.user.id}});
    });
  })
  .then(contactInst => {
    return Promise.map(contactInst, (contact) => {
      return contact ? contact.get() : contact;
    });
  })
  .then(contactData => {
    return Promise.each(contactData, (contact, index) => {
      if (contact === null) {
        res.locals.groupUserData[index].showSetting = 'pending';
      } else {
        res.locals.groupUserData[index].showSetting = contact.privacy;
      }
    });
  })
  .then(() => {
    res.status(200).json(res.locals.groupUserData);
  })
  .catch(err => {
    console.error(err);
    res.stats(400).json(err);
  });
};