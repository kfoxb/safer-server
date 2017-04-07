const mongoose = require('mongoose');
const db = require('../config.js');

let labelsSchema = mongoose.Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  label: String,
  coordinates: Object
});

let Labels = mongoose.model('Labels', labelsSchema);

module.exports = Labels;