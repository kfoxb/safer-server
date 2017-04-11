require('dotenv').config({path: './config.env'});

const db = require('./config.js');
const Users = require('./Users/Users.js');
const Location = require('./Location/Location.js');
const Labels = require('./Labels/Labels.js');
const Contacts = require('./Contacts/Contacts.js');
const Sequelize = require('sequelize');
const Promise = require('bluebird');

Users.findOrCreate({where: {phoneNumber: '43432423'},
  defaults: {
    first: 'Tiffany',
    last: 'Lin',
    email: 'tiff@email.com'
  }})
.then(() => {
  Users.findOrCreate({where: {phoneNumber: '1234567'},
    defaults: {
      first: 'Dario',
      last: 'Artega',
      email: 'dario@email.com'
    }}); 
})
.then(() => {
  Users.findOrCreate({where: {phoneNumber: '324321423'},
    defaults: {
      first: 'Kyle',
      last: 'Bradford',
      email: 'kyle@email.com'
    }});
})
.then(() => {
  Users.findOrCreate({where: {phoneNumber: '878765875'},
    defaults: {
      first: 'Raffy',
      last: 'Feliciano',
      email: 'raffy@email.com'
    }});
})
.then(() => {
  Contacts.findOrCreate({where: {privacy: 'pending', userId: 1}, 
    defaults: {
      friendId: 2
    }});

  Contacts.findOrCreate({where: {privacy: 'label', userId: 1}, 
    defaults: {
      friendId: 4
    }});
})
.then(() => {
  Contacts.findOrCreate({where: {privacy: 'pending', userId: 2}, 
    defaults: {
      friendId: 3
    }});

  Contacts.findOrCreate({where: {privacy: 'label', userId: 2}, 
    defaults: {
      friendId: 1
    }});
})
.then(() => {
  Contacts.findOrCreate({where: {privacy: 'pending', userId: 3}, 
    defaults: {
      friendId: 4
    }});

  Contacts.findOrCreate({where: {privacy: 'label', userId: 3}, 
    defaults: {
      friendId: 2
    }});
})
.then(() => {
  Contacts.findOrCreate({where: {privacy: 'pending', userId: 4}, 
    defaults: {
      friendId: 1
    }});

  Contacts.findOrCreate({where: {privacy: 'label', userId: 4}, 
    defaults: {
      friendId: 3
    }});
});


