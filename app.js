const serve = require('koa-static');
const sendfile = require('koa-sendfile');
const Koa = require('koa');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const cors = require('@koa/cors');
const session = require('koa-session');
const passport = require('koa-passport');
const path = require('path');
const Router = require('koa-router');

const router = new Router();
const PORT = process.env.PORT || 3000;

const app = new Koa();
const site = require('./routes/site');
require('./auth/auth')(passport);

// mongodb://boss:bossek1@ds213178.mlab.com:13178/tsdb
// mongodb://localhost/tsDB

mongoose
  .connect('mongodb://boss:bossek1@ds213178.mlab.com:13178/tsdb', {
    useNewUrlParser: true,
  })
  .then(() => console.log('Now connected to MongoDB!'))
  .catch((err) => console.error('Something went wrong', err));
mongoose.set('debug', true);
mongoose.connection.once('open', () => {
  console.log('connected to database');
});

app.keys = ['secret'];
app.use(bodyParser());
app.use(cors());

app.use(session({}, app));
app.use(passport.initialize());
app.use(passport.session());

// app.use(async ctx => {
//   console.log(ctx.isAuthenticated());
//   console.log(ctx.isUnauthenticated());
//   //await ctx.login();
//   //ctx.logout();
//   console.log("user", ctx.state.user);
// });

// Simple request time logger
app.use(json()).use(site.routes());
app.use(function* (next) {
  console.log(`A new request received at ${Date.now()}`);
  console.log(this);
  console.log(process.env.NODE_ENV);
  if (this.status != 404) return;
  console.log('Upsss', this.status);
  this.redirect('/not_found');

  // This function call is very important. It tells that more processing is
  // required for the current request and is in the next middleware function/route handler.
  yield next;
});

if (process.env.NODE_ENV === 'production') {
  console.log(process.env.NODE_ENV);
  console.log('jest produkcja ... .');
  app.use(serve('./Client/dist'));
  router.get('*', async (ctx, next) => {
    try {
      await send(ctx, './Client/dist/index.html');
    } catch (err) {
      // TODO: handle err?
      console.log('--------------');
      return next();
    }
  });
}

app.use(function* index() {
  yield sendfile(this, path.resolve(__dirname, 'Client', 'dist', 'index.html'));
  if (!this.status) this.throw(404);
});

app.use(function* (next) {
  if (this.status != 404) return;
  console.log('Upsss', this.status);
  this.redirect('/not_found');
  yield next;
});

app.listen(PORT, () => console.log(`Server Started ... at port ${PORT}`));
