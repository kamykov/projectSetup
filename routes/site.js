/* eslint-disable consistent-return */
/* eslint-disable no-undef */
const Router = require('koa-router');

const router = new Router();
const mongo = require('koa-mongo');
// const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const passport = require('koa-passport');

// import User from "../models/User";
const Page = require('../models/pages');
// const User = mongoose.model("User");
const validateLoginInput = require('../validation/login');
const validateRegisterInput = require('../validation/register');

router
  .get('/data', async (ctx) => {
    ctx.body = await Page.find();
  })
  .get('/users', async (ctx) => {
    ctx.response.status = 202;
    ctx.body = await User.find();
  })
  .get('/not_found', async (ctx) => {
    ctx.body = [{ type: 'warnning', message: 'URL.Not.Found' }];
  })
  .get('/user/status', async (ctx) => {
    ctx.body = [{ type: 'success', message: 'Auth.Login.Success' }];
  })
  .get('/user/:id', async (ctx) => {
    ctx.body = await ctx.db
      .collection('users')
      .findOne({ _id: mongo.ObjectId(ctx.params.id) });
  })
  .put('/user/:id', async (ctx) => {
    const documentQuery = { _id: mongo.ObjectId(ctx.params.id) };
    const valuesToUpdate = { $set: ctx.request.body };
    ctx.body = await ctx.db
      .collection('users')
      .updateOne(documentQuery, valuesToUpdate);
  })
  .post('/login', async (ctx) => {
    const { errors, isValid } = validateLoginInput(
      ctx.request.body,
    );
    if (isValid) {
      return passport.authenticate('local', (err, user, info, status) => {
        if (user) {
          ctx.login(user);
          ctx.body = [{ type: 'success', message: 'Auth.Login.Success' }];
          ctx.response.status = 202;
        } else {
          ctx.status = 206;
          ctx.body = [{ type: 'error', message: 'Auth.Login.Fail' }];
        }
      })(ctx);
    }
    ctx.body = Object.keys(errors).reduce((set, error) => [...set, { type: 'error', message: errors[error] }], []);
    ctx.response.status = 206;
  })
  .post('/register', async (ctx) => {
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
        const user = new User({
          username,
          password,
          date: new Date(),
        });
        await bcrypt.hash(user.password, 10).then((hash) => {
          user.password = hash;
        });
        user.save();
        ctx.body = [{ type: 'success', message: 'Auth.Register.Succes' }];
        ctx.response.status = 200;
      }
    }
  });

module.exports = router;
