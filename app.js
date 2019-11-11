require('dotenv').config();
const fs = require('fs');
const serve = require('koa-static');
const sendfile = require('koa-sendfile');
const Koa = require('koa');
const mongoose = require('mongoose');
const morgan = require('koa-morgan');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const cors = require('@koa/cors');
const session = require('koa-session');
const passport = require('koa-passport');
const path = require('path');
const Router = require('koa-router');

const router = new Router();
const PORT = process.env.PORT || 3000;

const accessLogStream = fs.createWriteStream(`${__dirname}/access.log`, { flags: 'a' });
const app = new Koa();
const siteRoutes = require('./routes/site');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
require('./auth/auth')(passport);

app.use(morgan('combined', { stream: accessLogStream }));

mongoose
  .connect(process.env.DATABASE, { useNewUrlParser: true })
  .then(() => console.log('Now connected to MongoDB!'))
  .catch((err) => console.error('Something went wrong with connection to Database', err));
mongoose.set('debug', true);
mongoose.connection.once('open', () => { console.log('connected to database'); });

app.keys = ['secret'];
app.use(bodyParser());
app.use(cors());

app.use(session({}, app));
app.use(passport.initialize());
app.use(passport.session());
app.use(json()).use(userRoutes.routes());
app.use(json()).use(siteRoutes.routes());
app.use(json()).use(authRoutes.routes());
app.use(userRoutes.allowedMethods());


if (process.env.NODE_ENV === 'production') {
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


app.use(function* (next) {
  console.log(this);
  if (this.status != 404) return;
  console.log('Upsss', this.status);
  this.redirect('/not_found');

  // This function call is very important. It tells that more processing is
  // required for the current request and is in the next middleware function/route handler.
  yield next;
});

app.use(function* index() {
  yield sendfile(this, path.resolve(__dirname, 'Client', 'dist', 'index.html'));
  if (!this.status) this.throw(404);
});

app.listen(PORT, () => console.log(`Server Started ... at port ${PORT}`));
