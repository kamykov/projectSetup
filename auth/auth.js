const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');

const options = {};

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(options, (username, password, done) => {
      User.findOne({
        username,
      }).then((user) => {
        if (!user) {
          return done(null, false, 'Auth.Login.Fail.User.Not.Found');
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            user.password = null;
            return done(null, user, 'Auth.Login.Success');
          }
          return done(null, false, 'Auth.Login.Fail');
        });
      });
    }),
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
