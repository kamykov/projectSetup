const serve = require("koa-static");
const Koa = require("Koa");
const mongo = require("koa-mongo");
const mongoose = require("mongoose");
const bodyParser = require("koa-bodyparser");
const json = require("koa-json");
const cors = require("@koa/cors");
const session = require("koa-session");
const passport = require("koa-passport");

const PORT = process.env.PORT || 3000;

const app = new Koa();
const site = require("./routes/site");

// Serve static assets in production

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(serve("Client/dist"));
  app.get("*", async ctx => {
    ctx.response.sendFile(
      path.resolve(__dirname, "Client", "dist", "index.html")
    );
  });
}

mongoose
  .connect("mongodb://localhost/tsDB")
  .then(() => console.log("Now connected to MongoDB!"))
  .catch(err => console.error("Something went wrong", err));
mongoose.set("debug", true);

app.use(
  mongo({
    host: "localhost",
    port: 27017,
    user: "admin",
    pass: "",
    db: "tsDB"
  })
);
app.keys = ["secret"];

app.use(bodyParser());
app.use(cors());

require("./auth/auth")(passport);
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

//Simple request time logger
app.use(function*(next) {
  console.log("A new request received at " + Date.now());
  console.log(this);

  //This function call is very important. It tells that more processing is
  //required for the current request and is in the next middleware function/route handler.
  yield next;
});
app.use(json()).use(site.routes());

app.use(function*(next) {
  if (404 != this.status) return;
  console.log("Upsss", this.status);
  this.redirect("/not_found");
  yield next;
});

app.listen(PORT, () => console.log("Server Started ..."));
