const Users = require('../../db/Users/Users.js');
const GoogleAuth = require('google-auth-library');
const Promise = require('bluebird');

module.exports = (req, res, next) => {
  if (req.headers.authorization === undefined) {
    console.log('no authorization header');
    res.status(401).json('Error: No Authorization header in request');
  } else {
    let oAuthToken = req.headers.authorization.slice(7);
    let auth = new GoogleAuth;
    let client = new auth.OAuth2(process.env.GOOGLE_AUTH_CLIENT_ID, '', '');

    let verifyIdToken = (token, clientId) => {
      return new Promise((resolve, reject) => {
        client.verifyIdToken(token, clientId, (err, login) => {
          if (err) {
            reject(err);
          } else {
            let userProfile = login.getPayload();
            let userid = userProfile['sub'];
            resolve(userProfile);
          }
        });
      });
    };

    verifyIdToken(oAuthToken, process.env.GOOGLE_AUTH_CLIENT_ID)
    .then((userProfile) => {
      let firstName = userProfile.name.slice(0, userProfile.name.indexOf(' '));
      let lastName = userProfile.name.slice(userProfile.name.indexOf(' ') + 1);
      let email = userProfile.email;
      return Users.findOrCreate({where: {email: email},
        defaults: {
          first: firstName,
          phoneNumber: `+1${req.body.phoneNumber}`,
          last: lastName,
          email: email,
          lat: '',
          long: ''
        }});
    })
    .spread((createdUser, wasCreated) => {
      createdUser = createdUser.get();
      req.user = createdUser;
      console.log(JSON.stringify(req.user));
      next(req, res);
    })
    .catch((err) => {
      console.log('OAuth2 Error: ', err);
      res.status(401).json('Error: OAuth Token Invalid');
    });
  }
};
