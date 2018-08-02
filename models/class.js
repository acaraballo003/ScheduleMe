const mongoose = require('mongoose');

const { Schema } = mongoose;

// This is where a class gets defined
const ClassSchema = new Schema({
  title: { type: String, required: true },
  days: { type: Array, required: true },
  start_time: { type: String },
  end_time: { type: String },
});

module.exports = mongoose.model('Class', ClassSchema);
