const Promise = require('bluebird');
const Users = require('../../db/Users/Users.js');
const Contacts = require('../../db/Contacts/Contacts.js');
const Labels = require('../../db/Labels/Labels.js');
const phone = require('phone');

exports.addFriend = (req, res) => {
  console.log('something');
  res.status(201).json('hello');
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
      console.log(result);
      res.status(200).send(result); 
    });
  });
};

exports.getFriendById = (req, res) => {
  res.status(200).json({});
};

exports.getContactInformation = (req, res) => {
  console.log(req.body);
  let contactArray = req.body.friends;

  Promise.map(contactArray, (contact) => {
    let phoneNumber = phone(contact.phoneNumber);
    return Users.findOne( {where: {phoneNumber: phoneNumber[0]} } )
    .then((user) => {
      let userExist = !(user === null);
      contact.hasApp = userExist;
    })
    .then(()=>{
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', contact);
      return contact;
    });
  })
  .then( results => {
    // console.log(results);
    res.status(200).json(results);
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
