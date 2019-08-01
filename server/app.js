const Koa = require("Koa");
const mongo = require("koa-mongo");
const mongoose = require("mongoose");

const bodyParser = require("koa-bodyparser");
const json = require("koa-json");
const cors = require("@koa/cors");

const app = new Koa();
const site = require("./routes/site");

mongoose
  .connect("mongodb://localhost/tsDB")
  .then(() => console.log("Now connected to MongoDB!"))
  .catch(err => console.error("Something went wrong", err));

app.use(cors());
app.use(
  mongo({
    host: "localhost",
    port: 27017,
    user: "admin",
    pass: "",
    db: "tsDB"
  })
);

//Simple request time logger
app.use(function*(next) {
  console.log("A new request received at " + Date.now());

  //This function call is very important. It tells that more processing is
  //required for the current request and is in the next middleware function/route handler.
  yield next;
});
app
  .use(json())
  .use(bodyParser())
  .use(site.routes());

app.listen(3000, () => console.log("Server Started ..."));
