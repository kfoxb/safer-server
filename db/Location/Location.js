const mongoose = require('mongoose');
const db = require('../config.js');

let locationSchema = mongoose.Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  coordinates: Object,
  lastUpdate: {type: Date, default: Date.now()}
});

let Location = mongoose.model('Location', locationSchema);

module.exports = Location;