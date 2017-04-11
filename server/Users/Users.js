const Users = require('../../db/Users/Users.js');
const Contacts = require('../../db/Contacts/Contacts.js');
const Labels = require('../../db/Labels/Labels.js');
const Location = require('../../db/Location/Location.js');
const phone = require('phone');

exports.addFriend = (req, res) => {
  Users.findAll()
  .then((users) => {
    Contacts.findAll()
    .then(contacts => {
      contacts.forEach(relationship => console.log(relationship.get()));
    });
  })
  .catch((err) => {
    console.log('error in finding all users', err);
  });
  // console.log(req.body);
  let friendsArray = req.body.friends;
  friendsArray.forEach((friend) => {
    let formatedPhoneNumber = phone(friend.phoneNumber);
    // console.log(formatedPhoneNumber);
  });

  res.status(201).json('hello');
};

exports.getAllFriends = (req, res) => {
  res.status(200).json({});
};

exports.getFriendById = (req, res) => {
  res.status(200).json({});
};

exports.updateFriendById = (req, res) => {
  res.status(200).json({});
};