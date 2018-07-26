const mongoose = require('mongoose');

const { Schema } = mongoose;

// This is where a class gets defined
const ClassSchema = new Schema({
  title: { type: String, required: true },
});

module.exports = mongoose.model('Class', ClassSchema);
