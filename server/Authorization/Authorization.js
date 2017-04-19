const Users = require('../../db/Users/Users.js');

module.exports = (req, res, next) => {
  // if (req.headers.authorization === undefined) {
  //   let errMsg = 'Error: No Authorization header in request';
  //   console.log(errMsg);
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
  //     next(req, res);
  //   })
  //   .catch((err) => {
  //     let errMsg = 'Error: OAuth Token Invalid';
  //     console.log(errMsg, err);
  //     res.status(401).json(errMsg);
  //   });
  // }
  req.user = {id: 1};
  next();
};
