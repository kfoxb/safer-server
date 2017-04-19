require('dotenv').config({path: './config.env'});

const db = require('./config.js');
const Users = require('./Users/Users.js');
const Notifications = require('./Notifications/Notifications.js');
const Labels = require('./Labels/Labels.js');
const Contacts = require('./Contacts/Contacts.js');
const Groups = require('./Groups/Groups.js');
const GroupMembers = require('./GroupMembers/GroupMembers.js');
const Sequelize = require('sequelize');
const Promise = require('bluebird');

Users.findOrCreate({where: {phoneNumber: '123123123'},
  defaults: {
    first: 'Tiffany',
    last: 'Lin',
    email: 'tiff@email.com',
    lat: '37.758777',
    long: '-122.436903',
    FCMToken: 'testtoken1'
  }
}).then(()=> {
  return Users.findOrCreate({where: {phoneNumber: '1234567'},
    defaults: {
      first: 'Dario',
      last: 'Arteaga',
      email: 'dario@email.com',
      lat: '37.760041',
      long: '-122.428914',
      FCMToken: 'testtoken2'
    }});
}).then(() => {
  return Users.findOrCreate({where: {phoneNumber: '324321423'},
    defaults: {
      first: 'Kyle',
      last: 'Bradford',
      email: 'kyle@email.com',
      lat: '37.741049',
      long: '-122.444415',
      currentLabel: 'School',
    }});
}).then(() => {
  return Users.findOrCreate({where: {phoneNumber: '878765875'},
    defaults: {
      first: 'Raffy',
      last: 'Feliciano',
      email: 'face@email.com',
      lat: '37.720844',
      long: '-122.462258',
      currentLabel: 'LKJSDFOIWEFOSEF',
    }});
}).then(() => {
  return Users.findOrCreate({where: {phoneNumber: '+19096412326'},
    defaults: {
      first: 'Test',
      last: 'friend',
      email: 'raffasdfy@email.com',
      lat: '37.720844',
      long: '-122.462258'
    }});
}).then(() => {
  return Users.findOrCreate({where: {phoneNumber: '+15104999601'},
    defaults: {
      first: 'Test',
      last: 'friend',
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
  Users.findOrCreate({where: {phoneNumber: '+14086428264'},
    defaults: {
      first: 'Friend',
      last: 'Dummy1',
      email: 'dummy1@email.com',
      lat: '37.720844',
      long: '-122.462258'
    }});
  Users.findOrCreate({where: {phoneNumber: '1212121212'},
    defaults: {
      first: 'Friend',
      last: 'Dummy2',
      email: 'dummy2@email.com',
      lat: '37.720844',
      long: '-122.462258'
    }});
}).then(() => {
  Contacts.findOrCreate({where: {privacy: 'GPS', userId: 1},
    defaults: {
      friendId: 2
    }});
}).then(() => {
  Contacts.findOrCreate({where: {privacy: 'label', userId: 1},
    defaults: {
      friendId: 4
    }});
}).then(() => {
  Contacts.findOrCreate({where: {privacy: 'GPS', userId: 1}, 
    defaults: {
      friendId: 3
    }});
}).then(() => {
  Contacts.findOrCreate({where: {privacy: 'GPS', userId: 3},
    defaults: {
      friendId: 1
    }});
}).then(() => {
  Contacts.findOrCreate({where: {privacy: 'label', userId: 4},
    defaults: {
      friendId: 1
    }});
}).then(() => {
  Contacts.findOrCreate({where: {privacy: 'pending', userId: 3},
    defaults: {
      friendId: 4
    }});
}).then(() => {
  Contacts.findOrCreate({where: {privacy: 'label', userId: 3},
    defaults: {
      friendId: 2
    }});
}).then(() => {
  Contacts.findOrCreate({where: {privacy: 'pending', userId: 4},
    defaults: {
      friendId: 1
    }});
}).then(() => {
  Contacts.findOrCreate({where: {privacy: 'label', userId: 4},
    defaults: {
      friendId: 3
    }});
}).then(() => {
  Contacts.findOrCreate({where: {privacy: 'label', userId: 2},
    defaults: {
      friendId: 1
    }});
}).then(() => {
  Groups.findOrCreate({where: {userId: 1, name: 'FAVORITES', privacy: 'GPS'}});
}).then(() => {
  GroupMembers.findOrCreate({where: {groupId: 1, userId: 3}});
}).then(() => {
  GroupMembers.findOrCreate({where: {groupId: 1, userId: 4}});
}).then(() => {
  Notifications.findOrCreate({where: {pubId: 1, subToken: 'db9X4YB6vDQ:APA91bHDabjLw07n83VdSHeccZTqCYHhQhHXfC79ogKcXsotJNsjHPP1cRa1zepWuVrhSmwCE7Hk_ys_LptQPpfZbDbHsUI24p_9q6fQFAIDJwyBwj3KnSWKfttHer0iKVe-KGKbXABW'}});
  Notifications.findOrCreate({where: {pubId: 1, subToken: 'c7zjUWic2NQ:APA91bEC20PlsPv7aX5XE4mr3GHQulc9NWVjpvsrS3MDVOZcZZPYrBPlc0ORclk1PK8G8DrdAoOJj_7O7hIr9V_DN6ErshmcQ99fVuXQWAsMWnix6cCCerq6W8IWZyzCmGkVKE4PSxQW'}});
  Notifications.findOrCreate({where: {pubId: 1, subToken: 'ezxk8eARn2o:APA91bEs58G4Rq6lEShzG475AjvLQv-WCXTmXCoSPUGuL1OIuqTlTuA6qhqJc-ZGLCwVa25FP0z1rT8KlTR_BoiTQbn3_k4-fdff6YMFIS47O8peYQSZ4gTxT7TdjxsPAmjqwkP8jSQQ'}});
});

