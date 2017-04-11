const Promise = require('bluebird');
const Users = require('../../db/Users/Users.js');
const Contacts = require('../../db/Contacts/Contacts.js');
const Labels = require('../../db/Labels/Labels.js');
const phone = require('phone');

exports.addFriend = (req, res) => {
  console.log('something');
  res.status(201).json('hello');
};

exports.getAllFriendIds = (req, res, next) => {
  console.log(req.user);

  // Assuming middle ware is doing work before to find the UserId in Database;
  Contacts.findAll( { where: {userId: req.user.id} } )
  .then((friends) => {
    req.body.friendIds = friends.map((friend) => {
      let status = friend.get('privacy');
      let id = friend.get('friendId');
      return {id: id, status: status};
    });
  })
  .then(() => {
    next();
  });
};

exports.getAllFriendData = (req, res) => {
  console.log('is getallfriendData', req.body.friendIds);
  let friendArray = req.body.friendIds;
  let length = friendArray.length;

  let counter = 0;

  friendArray.forEach((friend) => {
    Users.findOne( { where: {id: friend.id} } )
    .then((user) => {
      let friendData = user.get();
      friend.first = friendData.first;
      friend.last = friendData.last;
      counter++;
      if (counter === length) { res.status(200).json(friendArray); }
    });
  });
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
