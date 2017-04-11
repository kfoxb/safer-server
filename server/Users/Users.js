const Users = require('../../db/Users/Users.js');
const Contacts = require('../../db/Contacts/Contacts.js');
const Labels = require('../../db/Labels/Labels.js');
const phone = require('phone');

exports.addFriend = (req, res) => {
  console.log('something');
  // Users.findAll()
  // .then((users) => {
  //   Contacts.findAll()
  //   .then(contacts => {
  //     contacts.forEach(relationship => console.log(relationship.get()));
  //   });
  // })
  // .catch((err) => {
  //   console.log('error in finding all users', err);
  // });
  // // console.log(req.body);
  // let friendsArray = req.body.friends;
  // friendsArray.forEach((friend) => {
  //   let formatedPhoneNumber = phone(friend.phoneNumber);
  //   // console.log(formatedPhoneNumber);
  // });

  res.status(201).json('hello');
};

exports.getAllFriends = (req, res) => {
  console.log(req.user);

  // Assuming middle ware is doing work before to find the UserId in Database;
  Contacts.findAll({where: {UserId: req.user.id}})
  .then((friends) => {
    
  })
  res.status(200).json({});
};

exports.getFriendById = (req, res) => {
  res.status(200).json({});
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
