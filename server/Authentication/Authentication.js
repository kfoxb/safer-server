const Users = require('../../db/Users/Users.js');
const Groups = require('../../db/Groups/Groups.js');
const GoogleAuth = require('google-auth-library');
const Promise = require('bluebird');
const jwt = require('jsonwebtoken');

const validateToken = (token) => {
  let CLIENT_ID = process.env.GOOGLE_AUTH_WEB_CLIENT_ID;
  let auth = new GoogleAuth;
  let client = new auth.OAuth2(CLIENT_ID, '', '');
  return new Promise((resolve, reject) => {
    client.verifyIdToken(token, CLIENT_ID,
      function(e, login) {
        if (e) {
          reject(e);
        } else {
          let payload = login.getPayload();
          let user = {};
          user.email = payload['email'];
          let fullName = payload['name'];
          user.firstName = fullName.slice(0, fullName.indexOf(' '));
          user.lastName = fullName.slice(fullName.indexOf(' ') + 1);
          resolve(user);
        }
      }
    );
  });
};

exports.authorization = (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization === JSON.stringify({})) {
    let errMsg = 'Error: No Authorization header in request';
    console.error(errMsg);
    res.status(401).json(errMsg);
  } else {
    let userProfile = JSON.parse(req.headers.authorization);
    let firstName = userProfile.name.slice(0, userProfile.name.indexOf(' '));
    let lastName = userProfile.name.slice(userProfile.name.indexOf(' ') + 1);
    let email = userProfile.email;
    Users.findOrCreate({where: {email: email},
      defaults: {
        first: firstName,
        last: lastName,
        email: email
      }
    })
    .spread((createdUser, wasCreated) => {
      req.user = createdUser.get();
      req.user.created = wasCreated;
      if (wasCreated) {
        Groups.create({
          userId: req.user.id,
          name: 'FAVORITES',
          privacy: 'label'
        });
      }
      next();
    })
    .catch((err) => {
      let errMsg = 'Error: OAuth Token Invalid';
      console.error(errMsg, err);
      res.status(401).json(errMsg);
    });
  }
};

exports.authentication = (req, res) => {
  validateToken(req.body.token)
  .then((user) => {
    return Users.findOrCreate({where: {email: user.email},
      defaults: {
        first: user.firstName,
        last: user.lastName,
        email: user.email
      }
    });
  })
  .spread((createdUser, wasCreated) => {
    //get user information from createdUser
    //Use information to generate JWT to send back to client
    let user = createdUser.get();
    user.created = wasCreated;

    if (wasCreated) {
      Groups.create({
        userId: user.id,
        name: 'FAVORITES',
        privacy: 'label'
      });
    }

    let payload = {
      email: user.email
    };
    let jwtOptions = {
      expiresIn: '30s'
    };
    //send back JWT and wasCreated value to client
    return jwt.sign(payload, key, jwtOptions);
  })
  .then((token) => {
    console.log('this is token', token);
    res.status(200).json(token);
  })
  .catch((err) => {
    //send error message back to client here
    console.log('there was an error:', err);
  });
};
