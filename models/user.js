const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

// This is where a  user is defined
const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  classes: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
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


// This is what helps authenticate a user upon login
UserSchema.statics.authenticate = function(username, password, next) {
  User.findOne({ username: username })
    .exec(function (err, user){
      if (err) return next(err);
      if (!user) {
        const error = new Error('User not found.');
        error.status = 401;
        return next(error);
      }

      // this compares the hashes of the user input and what is stored in the database
      return bcrypt.compare(password, user.password, (err, result) => {
        if (result === true) {
          return next(null, user);
        }
        return next();
      });
    });
};


const User = mongoose.model('User', UserSchema);
module.exports = User;
