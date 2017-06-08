const Users = require('../../db/Users/Users.js');
const Groups = require('../../db/Groups/Groups.js');
const GoogleAuth = require('google-auth-library');

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
  .then((email) => {
    console.log('this is email', email);
  })
  .catch((err) => {
    console.log('there was an error:', err);
  });
};
