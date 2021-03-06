import User from '../models/user.models';
import passportLocal from 'passport-local';

// local signup strategy
export default new passportLocal.Strategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  let time = new Date().getTime() + 30*60*1000;
  const userData = {
    email: email.trim(),
    password: password.trim(),
    name: req.body.name.trim(),
    nextCaptcha: time
};

  const newUser = new User(userData);
  newUser.save((err) => {
    if (err) { return done(err); }

    return done(null);
  });
});
