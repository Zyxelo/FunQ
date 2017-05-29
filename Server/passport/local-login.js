import jwt from 'jsonwebtoken';
import User from '../models/user.models';
import passportLocal from 'passport-local';
import config from '../config'

//Local login strategy
export default new passportLocal.Strategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim()
  };

  // find a user by email address
  return User.findOne({ email: userData.email }, (err, user) => {
    if (err) {
      err.message = 'Incorrect email or password';
      return done(err);
    }

    if (!user) {
      const error = new Error('Incorrect email or password');
      error.name = 'IncorrectCredentialsError';

      return done(error);
    }

    // check if a hashed user's password is equal to a value saved in the database
    return user.comparePassword(userData.password, (passwordErr, isMatch) => {
      if (err) {
        err.message = 'Incorrect email or password';
        return done(err);
      }

      if (!isMatch) {
        const error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';

        return done(error);
      }
      const payload = {
        sub: userData.email
      };

      // create a token
      const token = jwt.sign(payload, config.jwtSecret);
      const data = {
        id:user._id
      };

      return done(null, token, data);
    });
  });
});
