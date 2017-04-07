const mongoose = require('mongoose');
const db = require('../config.js');

let contactsSchema = mongoose.Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  friend: {type: Schema.Types.ObjectId, ref: 'User'},
  privacy: String
});

let Contacts = mongoose.model('Contacts', contactsSchema);

module.exports = Contacts;