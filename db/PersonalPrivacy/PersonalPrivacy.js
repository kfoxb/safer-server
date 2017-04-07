const mongoose = require('mongoose');
const db = require('../config.js');

let privacySchema = mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  incognito: Boolean,
  defaultPrivacy: String
});

let Privacy = mongoose.model('Privacy', privacySchema);

module.exports = Privacy;