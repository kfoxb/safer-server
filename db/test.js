require('dotenv').config({path: './config.env'});

const db = require('./config.js');
const Users = require('./Users/Users.js');
const Labels = require('./Labels/Labels.js');
const Contacts = require('./Contacts/Contacts.js');
const Groups = require('./Groups/Groups.js');
const GroupMembers = require('./GroupMembers/GroupMembers.js');
const Sequelize = require('sequelize');
const Promise = require('bluebird');

Users.findOrCreate({where: {phoneNumber: '+14153083372'},
  defaults: {
    first: 'Tiffany',
    last: 'Lin',
    email: 'tiff@email.com',
    lat: '37.758777',
    long: '-122.436903'
  }
}).then((user)=> {
  var userId = user[0].dataValues.id;
  Labels.create({
    userId: userId,
    lat: '37.758777',
    long: '-122.436903',
    label: 'Home'
  });
  Labels.create({
    userId: userId,
    lat: '37.783609',
    long: '-122.408940',
    label: 'Work'
  });
  return Users.findOrCreate({where: {phoneNumber: '1234567'},
    defaults: {
      first: 'Dariooooo',
      last: 'Artega',
      email: 'dario@email.com',
      lat: '37.760041',
      long: '-122.428914'
    }});
}).then((user) => {
  var userId = user[0].dataValues.id;
  Labels.create({
    userId: userId,
    lat: '37.760041',
    long: '-122.428914',
    label: 'Home'
  });
  Labels.create({
    userId: userId,
    lat: '37.783609',
    long: '-122.408940',
    label: 'Work'
  });
  return Users.findOrCreate({where: {phoneNumber: '324321423'},
    defaults: {
      first: 'Kyle',
      last: 'Bradford',
      email: 'kyle@email.com',
      lat: '37.741049',
      long: '-122.444415'
    }});
}).then((user) => {
  var userId = user[0].dataValues.id;
  Labels.create({
    userId: userId,
    lat: '37.741049',
    long: '-122.444415',
    label: 'Home'
  });
  Labels.create({
    userId: userId,
    lat: '37.783609',
    long: '-122.408940',
    label: 'Work'
  });
  return Users.findOrCreate({where: {phoneNumber: '878765875'},
    defaults: {
      first: 'Raffy',
      last: 'Feliciano',
      email: 'raffy@email.com',
      lat: '37.720844',
      long: '-122.462258'
    }});
}).then((user) => {
  var userId = user[0].dataValues.id;
  Labels.create({
    userId: userId,
    lat: '37.720844',
    long: '-122.462258',
    label: 'Home'
  });
  Labels.create({
    userId: userId,
    lat: '37.783609',
    long: '-122.408940',
    label: 'Work'
  });
  Users.findOrCreate({where: {phoneNumber: '+18056377243'},
    defaults: {
      first: 'Friend',
      last: 'Dummy1',
      email: 'dummy1@email.com',
      lat: '37.720844',
      long: '-122.462258'
    }});
  Users.findOrCreate({where: {phoneNumber: '+16505348330'},
    defaults: {
      first: 'Friend',
      last: 'Dummy2',
      email: 'dummy2@email.com',
      lat: '37.720844',
      long: '-122.462258'
    }});
}).then(() => {
  Contacts.findOrCreate({where: {privacy: 'pending', userId: 1},
    defaults: {
      friendId: 2
    }});
}).then(() => {
  Contacts.findOrCreate({where: {privacy: 'label', userId: 1},
    defaults: {
      friendId: 4
    }});
}).then(() => {
  Contacts.findOrCreate({where: {privacy: 'GPS', userId: 4},
    defaults: {
      friendId: 1
    }});
}).then(() => {
  Contacts.findOrCreate({where: {userId: 1, friendId: 3},
    defaults: {
      privacy: 'label'
    }});
}).then(() => {
  Contacts.findOrCreate({where: {userId: 3, friendId: 1},
    defaults: {
      privacy: 'label'
    }});
});
// .then(() => {
//   Contacts.findOrCreate({where: {privacy: 'pending', userId: 2},
//     defaults: {
//       friendId: 3
//     }});
// }).then(() => {
//   Contacts.findOrCreate({where: {privacy: 'label', userId: 2},
//     defaults: {
//       friendId: 1
//     }});
// }).then(() => {
//   Contacts.findOrCreate({where: {privacy: 'label', userId: 1},
//     defaults: {
//       friendId: 2
//     }});
// }).then(() => {
//   Contacts.findOrCreate({where: {privacy: 'pending', userId: 3},
//     defaults: {
//       friendId: 4
//     }});
// }).then(() => {
//   Contacts.findOrCreate({where: {privacy: 'label', userId: 3},
//     defaults: {
//       friendId: 2
//     }});
// }).then(() => {
//   Contacts.findOrCreate({where: {privacy: 'label', userId: 2},
//     defaults: {
//       friendId: 3
//     }});  
// }).then(() => {
//   Contacts.findOrCreate({where: {privacy: 'pending', userId: 4},
//     defaults: {
//       friendId: 1
//     }});
// }).then(() => {
//   Contacts.findOrCreate({where: {privacy: 'label', userId: 4},
//     defaults: {
//       friendId: 3
//     }});
// }).then(() => {
//   Contacts.findOrCreate({where: {privacy: 'label', userId: 3},
//     defaults: {
//       friendId: 4
//     }});
// });

