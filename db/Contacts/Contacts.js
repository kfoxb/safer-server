const mongoose = require('mongoose');
const db = require('../config.js');

let contactsSchema = mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  friend: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  privacy: String
});

let Contacts = mongoose.model('Contacts', contactsSchema);

module.exports = Contacts;