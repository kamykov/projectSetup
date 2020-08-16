const passport = require('koa-passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { validateLoginInput, validateRegisterInput } = require('../validation/auth');

exports.login = async (ctx) => {
  const { errors, isValid } = validateLoginInput(ctx.request.body);

  if (isValid) {
    return passport.authenticate('local', (err, user, message) => {
      if (err) {
        ctx.body = [{ type: 'error', message }];
      }
      if (user) {
        ctx.login(user);
        ctx.redirect('user/status');
        ctx.body = [{ type: 'success', message, user }];
        ctx.response.status = 202;
      } else {
        ctx.status = 206;
        ctx.body = [{ type: 'error', message }];
      }
    })(ctx);
  }
  ctx.body = Object.keys(errors).reduce((set, error) => [...set, { type: 'error', message: errors[error] }], []);
  ctx.response.status = 206;
};

exports.logout = (ctx) => {
  console.log('get logout');
  ctx.logout();
  ctx.redirect('/');
};

exports.register = async (ctx) => {
  const { errors, isValid } = validateRegisterInput(ctx.request.body);
  const { username, password } = ctx.request.body;
  if (!isValid) {
    ctx.body = Object.keys(errors).reduce((set, error) => [...set, { type: 'error', message: errors[error] }], []);
    ctx.response.status = 206;
  } else {
    const user = await User.findOne({
      username,
    });
    if (user) {
      ctx.body = [
        { type: 'warnning', message: 'Auth.Register.Error.UserExists' },
      ];
      ctx.response.status = 206;
    } else {
      const newUser = new User({
        username,
        password,
      });
      await bcrypt.hash(newUser.password, 10).then((hash) => {
        newUser.password = hash;
      });
      newUser.save();
      ctx.body = [{ type: 'success', message: 'Auth.Register.Succes' }];
      ctx.response.status = 200;
    }
  }
};

exports.isAuthenticated = (ctx, next) => {
  if (ctx.isAuthenticated()) {
    return next();
  }
  ctx.body = ({ error: 'Not Authenticated' });
};

exports.isAdmin = (ctx, next) => {
  if (ctx.profile && ctx.profile.role === 1) {
    return next();
  }
  ctx.body = ({
    error: 'Admin resource! Access denied',
  });
};
