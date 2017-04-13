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
  });
};

exports.getAllFriendData = (req, res, next) => {
  // Assuming middle ware is doing work before to find the UserId in Database;
  Contacts.findAll( { where: {userId: req.user.id} } )
  .then((friends) => {
    Promise.map(friends, (friend) => {
      let friendData = friend.get();
      let friendObj = {
        privacy: friendData.privacy
      };
      return Users.findOne( { where: {id: friendData.friendId} } )
      .then((user) => {
        let userData = user.get();
        friendObj.first = userData.first;
        friendObj.last = userData.last;
      }).
      then(() => {
        return friendObj;
      });
    })
    .then( result => {
      res.status(200).send(result); 
    });
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
        .then( user => {
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
  .then( results => {
    res.status(200).json(notFriends);
  });
};

exports.updateFriendById = (req, res) => {
  res.status(200).json({});
};

exports.updateCoordinates = () => {
  res.status(200).json({});
};

exports.updatePrivacy = () => {
  res.status(200).json({});
};
