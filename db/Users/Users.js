const mongoose = require('mongoose');
const db = require('../config.js');

let userSchema = mongoose.Schema({
  first: String,
  last: String,
  phoneNumber: {type:Number, Unique: true},
  email: String
});

let User = mongoose.model('User', userSchema);

module.exports = User;