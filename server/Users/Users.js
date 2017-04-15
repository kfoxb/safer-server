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

// TODO: Second half
//http://www.datchley.name/promise-patterns-anti-patterns/
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
        friendObj.phoneNumber = userData.phoneNumber;
      })
      .then(() => {
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
    .catch((error) => {
      console.log('Errored out from updating coordinates')
      res.status(404).json({error: error});
    })
  })
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
    res.status(500).json({err: err});
  });
};
