const Router = require('koa-router');
const mongo = require('koa-mongo');
const Page = require('../models/pages');

const { isAuthenticated } = require('../controllers/auth');


const router = new Router();

router
  .get('/data', async (ctx) => {
    ctx.body = await Page.find();
  })
  .get('/users', async (ctx) => {
    ctx.response.status = 202;
    // ctx.body = await User.find();
    ctx.body = [{ type: 'error', message: 'URL.Not.Found' }];
  })
  .get('/not_found', async (ctx) => {
    ctx.body = [{ type: 'warnning', message: 'URL.Not.Found' }];
  })
  .get('/user/status', isAuthenticated, async (ctx) => {
    console.log('/user/status', ctx.state.user);
    ctx.body = [{ type: 'success', message: 'user/status' }];
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
  });

module.exports = router;
