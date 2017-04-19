const Promise = require('bluebird');
const Users = require('../../db/Users/Users.js');
const Contacts = require('../../db/Contacts/Contacts.js');
const Labels = require('../../db/Labels/Labels.js');
const phone = require('phone');

exports.addFriend = (req, res) => {
  let contact = req.body.contact;
  Users.findOne({ where: {phoneNumber: phone(contact.phoneNumber)[0]} } )
  .then( user => {
    let userData = user.get();
    return Contacts.create({userId: req.user.id, friendId: userData.id, privacy: 'pending'})
    .then((newFriendship) => {
      let newFriend = newFriendship.get();
      return newFriend;
    });
  })
  .then((result) => {
    res.status(201).json('Success! Friend request pending');
  })
  .catch((err) => {
    console.error('There was an error adding a friend: ', err);
  });
};

// TODO: Second half
//http://www.datchley.name/promise-patterns-anti-patterns/
exports.getAllFriendData = (req, res, next) => {
  // Assuming middle ware is doing work before to find the UserId in Database;
<<<<<<< HEAD
  let query = {
    where: {
      userId: req.user.id
    }
  };
  if (req.query.groups === 'true') {
    query['where']['privacy'] = {$ne: 'pending'};
  }
  let friendData = Contacts.findAll(query)
  .then(contactInst => {
=======

  let friendData = Contacts.findAll({where: {userId: req.user.id} } )
  .then((contactInst) => {
>>>>>>> Standardize syntax and add more error handling
    return Promise.map(contactInst, (contact) => {
      let contactData = contact.get();
      return Users.findOne({where: {id: contactData.friendId}});
    });
  })
  .then((friendInst) => {
    return Promise.map(friendInst, (friend) => {
      return friend.get();
    });
  })
  .catch((err) => {
    console.error('There was an error getting all friend data: ', err);
  });
<<<<<<< HEAD
  let privacyData = Contacts.findAll(query)
  .then(contactInst => {
=======


  let privacyData = Contacts.findAll({where: {userId: req.user.id} } )
  .then((contactInst) => {
>>>>>>> Standardize syntax and add more error handling
    return Promise.map(contactInst, (contact) => {
      let contactData = contact.get();
      return Contacts.findOne({where: {userId: contactData.friendId, friendId: req.user.id}});
    });
  })
<<<<<<< HEAD
  .then(privacyInst => {
=======
  .then((privacyInst) => {
    // console.log(JSON.stringify(privacyInst));
>>>>>>> Standardize syntax and add more error handling
    return Promise.map(privacyInst, (privacy) => {
      return privacy ? privacy.get() : privacy;
    });
  })
  .catch((err) => {
    console.error('There was an error getting privacy data: ', err);
  });
  Promise.all([friendData, privacyData])
  .spread((friend, privacy) => {
    return Promise.map(friend, (data, index) => {
      if (privacy[index] === null) { 
        data.showSetting = 'pending'; 
      } else {
        data.showSetting = privacy[index].privacy;
      }
      return data;
    });
  })
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    console.error('There was an error packaging the friend and privacy data: ', err);
    res.status(500).json(err);
  });
};

exports.getFriendById = (req, res) => {
  res.status(200).json({});
};

exports.getContactInformation = (req, res) => {
  let contactArray = req.body.friends;
  let notFriends = [];
  Promise.each(contactArray, (contact) => {
    let phoneNumber = phone(contact.phoneNumber);
    return Users.findOne( {where: {phoneNumber: phoneNumber[0]} } )
    .then((user) => {
      if ( user !== null ) {
        let userData = user.get();
        return Contacts.findOne({where: {userId: req.user.id, friendId: userData.id} } )
        .then((user) => {
          if (user === null) {
            contact.hasApp = true;
            notFriends.push(contact);  
          }
        });
      } else {
        contact.app = false;
        notFriends.push(contact);
      }
      // let userExist = !(user === null);
    });
  })
  .then((results) => {
    res.status(200).json(notFriends);
  });
};

exports.updateFriendById = (req, res) => {
  res.status(200).json({});
};

exports.updateCoordinates = (req, res) => {
  Users.findOne({
    where: {
      phoneNumber: req.query.id
    }
  })
  .then((user) => {
    user.update({
      lat: req.body.lat,
      long: req.body.lng
    })
    .then((user) => {
      res.status(202).json({});   
    })
    .catch((err) => {
      console.error('Errored out from updating coordinates: ', err);
      res.status(404).json({error: error});
    });
  });
};

exports.updatePrivacy = (req, res) => {
  // TODO: set a userId on the req.body to query the db with
  // currently hardcoding to 1
  var toUpdate = {};
  if (req.body.privacy) {
    toUpdate = { defaultPrivacy: req.body.privacy };
  } else if (req.body.incognito) {
    toUpdate = { incognito: req.body.incognito };
  }
  Users.findOne({where: {id: req.body.userId}})
  .then((user) => {
    return user.update(toUpdate);
  }).then((user) => {
    res.status(200).send();
  }).catch((err) => {
    console.error('There was an error updating the user privacy info: ', err);
    res.status(500).json({err: err});
  });
};

exports.findUserWithPhoneNumber = (req, res, next) => {
  Users.findOne({ 
    where: { phoneNumber: '1234567' },
  })
  .then((user) => {
    req.friend = user.get();
    next();
  })
  .catch((err) => {
    console.error('There was an error finding a user via phone number: ', err);
    res.error = err;
    next();
  });
};
