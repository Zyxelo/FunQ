import Mongoose from 'mongoose';
import Bcrypt from 'bcrypt';

// Define user model
const UserSchema = new Mongoose.Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  password: String,
  name: String,
  lastCaptcha: Date
});

// Compare user password
UserSchema.methods.comparePassword = function comparePassword(password, callback) {
  Bcrypt.compare(password, this.password, callback);
};

// Performed before the user is saved
UserSchema.pre('save', function saveHook(next) {
  const user = this;

  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next();

  return Bcrypt.genSalt((saltError, salt) => {
    if (saltError) { return next(saltError); }

    return Bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { return next(hashError); }

      // replace a password string with hash value
      user.password = hash;

      return next();
    });
  });
});

export default Mongoose.model('User', UserSchema);