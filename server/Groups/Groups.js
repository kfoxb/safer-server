const Promise = require('bluebird');
const Users = require('../../db/Users/Users.js');
const Contacts = require('../../db/Contacts/Contacts.js');
const Groups = require('../../db/Groups/Groups.js');
const phone = require('phone');

exports.addGroup = (req, res) => {
  console.log(req.body.groupSettings);

  res.status(201).json('SUCCESS!!!');
};