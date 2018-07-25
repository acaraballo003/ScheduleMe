const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

// This is where a  user is defined
const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// This function hashes the user's password before they get saved to the database
UserSchema.pre('save', function(next) {
  let user = this;

  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(err);

    user.password = hash;
    return next();
  });
});


const User = mongoose.model('User', UserSchema);
module.exports = User;
