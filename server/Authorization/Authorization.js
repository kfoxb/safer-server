const Users = require('../../db/Users/Users.js');

module.exports = (req, res, next) => {
  // console.log('these are headers', req.headers.authorization);
  // if (req.headers.authorization === undefined || req.headers.authorization === JSON.stringify({})) {
  //   let errMsg = 'Error: No Authorization header in request';
  //   console.error(errMsg);
  //   res.status(401).json(errMsg);
  // } else {
  //   let userProfile = JSON.parse(req.headers.authorization);
  //   let firstName = userProfile.name.slice(0, userProfile.name.indexOf(' '));
  //   let lastName = userProfile.name.slice(userProfile.name.indexOf(' ') + 1);
  //   let email = userProfile.email;
  //   Users.findOrCreate({where: {email: email},
  //     defaults: {
  //       first: firstName,
  //       phoneNumber: `+1${userProfile.phoneNumber}`,
  //       last: lastName,
  //       email: email,
  //       lat: '',
  //       long: ''
  //     }})
  //   .spread((createdUser, wasCreated) => {
  //     req.user = createdUser.get();
  //     console.log('this is req.user', req.user);
  //     console.log('this is req.body', req.body);
  //     next();
  //   })
  //   .catch((err) => {
  //     let errMsg = 'Error: OAuth Token Invalid';
  //     console.error(errMsg, err);
  //     res.status(401).json(errMsg);
  //   });
  // }
  req.user = {id: 1};
  next();
};
