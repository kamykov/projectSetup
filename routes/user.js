const Router = require('koa-router');
const { userById } = require('../controllers/user');

const router = new Router();

router
  .param('userId', userById)
  .get('/secret/:userId', async (ctx, next) => {
    ctx.body = await ({ msg: '/secret/:userId', user: ctx.profile });
    ctx.status = 200;
  });

module.exports = router;
