const Router = require('koa-router');

const router = new Router();
const { login, register, logout } = require('../controllers/auth');

router
  .post('/login', login)
  .post('/register', register)
  .get('/logout', logout);

module.exports = router;
