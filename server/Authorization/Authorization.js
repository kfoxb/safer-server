const Users = require('../../db/Users/Users.js');
const PersonalPrivacy = require('../../db/PersonalPrivacy/PersonalPrivacy.js');

module.exports = (req, res, next) => {
  console.log('hi');
  next(req, res);
};