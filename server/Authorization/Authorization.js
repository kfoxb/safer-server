const Users = require('../../db/Users/Users.js');

module.exports = (req, res, next) => {
  console.log('hi');
  next(req, res);
};