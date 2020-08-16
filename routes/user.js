const Router = require('koa-router');
const { userById } = require('../controllers/user');
const { isAdmin } = require('../controllers/auth');

const router = new Router();

router
  .param('userId', userById)
  .get('/secret/:userId', async (ctx, next) => {
    ctx.body = await ({ msg: '/secret/:userId', user: ctx.profile });
    ctx.status = 200;
  })
  .get('/admin/:userId', isAdmin, async (ctx, next) => {
    ctx.body = ({ msg: 'Admin resource', user: ctx.profile });
  });

module.exports = router;
