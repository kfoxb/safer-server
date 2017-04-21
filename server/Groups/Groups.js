const Promise = require('bluebird');
const Users = require('../../db/Users/Users.js');
const Contacts = require('../../db/Contacts/Contacts.js');
const Groups = require('../../db/Groups/Groups.js');
const GroupMembers = require('../../db/GroupMembers/GroupMembers.js');
const phone = require('phone');

exports.updateGroupPrivacy = (req, res) => {
  console.log('herwesadf');
  Groups.findOne({where: {name: req.query.name, userId: req.user.id} } )
  .then(groupInst => {
    let newPrivacy;

    if (req.body.showLabel) {
      newPrivacy = 'label';
    } else {
      newPrivacy = 'GPS';
    }
    return groupInst.update({privacy: newPrivacy});
  })
  .then(newGroupInst => {
    res.status(200).json(newGroupInst.get());
    
  });
};

exports.updateGroupUsers = (req, res) => {
  console.log(req.body);
  Groups.findOne({where: {userId: req.user.id, name: req.query.name} })
  .then(groupInst => {
    return groupInst.get('id');
  })
  .tap(groupId => {
    Promise.each(req.body.toAdd, user => {
      console.log(groupId, user.id);
      return GroupMembers.create({groupId: groupId, userId: user.id});
    });
  })
  .then(groupId => {
    return Promise.map(req.body.toDelete, user => {
      return GroupMembers.findOne({where: {groupId: groupId, userId: user.id} } );
    });
  })
  .then(toDeleteInst => {
    Promise.map(toDeleteInst, user => {
      return user.destroy();
    });
  })
  .then(() => {
    res.status(200).json('hello');
  })
  .error(err => {
    console.error(err);
  })
  .catch(err => {
    console.log('error in editing group', err);
    res.status(400).json(err);
  });
};

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
      return member.get('userId');
    });
  })
  .then(memberData => {
    return Promise.map(memberData, (user) => {
      return {$ne: user};
    });
  })
  .then(memberId => {
    return Contacts.findAll({
      where: {
        userId: req.user.id, 
        friendId: {$and: memberId}
      }
    });
  })
  .then(contactInst => {
    return Promise.map(contactInst, (contact) => {
      let contactId = contact.get('friendId');
      return Users.findOne({where: {id: contactId} });
    });
  })
  .then(friendInst => {
    return Promise.map(friendInst, friend => {
      return friend.get();
    });
  })
  .then(friendData => {
    res.status(200).json(friendData);
  })
  .catch(err => {
    console.error(err);
    res.status(400).json(err);
  });
};

exports.getGroupUsers = (req, res) => {
  let groupUserData = [];
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
      groupUserData.push(user.get());
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
        groupUserData[index].showSetting = 'pending';
      } else {
        groupUserData[index].showSetting = contact.privacy;
      }
    });
  })
  .then(() => {
    res.status(200).json(groupUserData);
  })
  .catch(err => {
    console.error(err);
    res.stats(400).json(err);
  });
};